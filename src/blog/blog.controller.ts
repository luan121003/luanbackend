import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/auth/decorator/role.decorator';
import { Role } from 'src/auth/decorator/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleAuthGuard } from 'src/auth/guards/role-jwt.guard';

import { BlogService } from 'src/blog/blog.service';
import { BlogDto } from 'src/blog/dto/blog.dto';
import { Blog } from 'src/blog/model/blog.schema';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { buildPagination, checkMainFile } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Controller('blogs')
export class BlogController {
  constructor(
    private readonly service: BlogService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @UseInterceptors(FileInterceptor('main_image'))
  @Post()
  async create(
    @Body() blog: BlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
    const newBlog = await this.service.createBlog(blog);
    const result = await this.cloudinaryService.uploadFile(
      file,
      'blogs/' + newBlog._id,
    );

    return await this.service.uploadMainImage(newBlog._id, {
      image_id: result.public_id,
      image_url: result.url,
    });
  }

  @Get('/:id')
  getBlog(@Param('id') id: string) {
    return this.service.getOne(id);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put('/:id')
  updateBlog(@Param('id') id: string, @Body() blog: BlogDto) {
    return this.service.updateById(id, blog);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Put(':id/main_image')
  @UseInterceptors(FileInterceptor('main_image'))
  async updateImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    checkMainFile(file);

    if (!file) {
      throw new BadRequestException('Không nhận được file!');
    }

    const product = await this.service.getOne(id);

    const result = await this.cloudinaryService.uploadFile(
      file,
      'products/' + product._id,
    );

    if (product.image_id) {
      await this.cloudinaryService.deleteImage(product.image_id);
    }

    const newBlog = await this.service.uploadMainImage(product._id, {
      image_id: result.public_id,
      image_url: result.url,
    });

    return id;
  }

  @Get()
  async getAll(@Query() params: ParamPaginationDto) {
    const blogs = await this.service.findAll(params);

    return buildPagination<Blog>(blogs, params);
  }

  @UseGuards(JwtAuthGuard, RoleAuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.service.deleteById(id);
  }
}
