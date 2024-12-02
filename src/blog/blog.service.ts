import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';
import { BlogRepository } from 'src/blog/blog.repository';
import { BlogDto } from 'src/blog/dto/blog.dto';
import { checkValisIsObject } from 'src/common/common';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

@Injectable()
export class BlogService {
  constructor(private readonly repository: BlogRepository) {}

  async createBlog(blogDto: BlogDto) {
    const blog = await this.repository.create({
      _id: new Types.ObjectId(),
      ...blogDto,
    });

    return blog;
  }

  async getOne(id: string) {
    checkValisIsObject(id, 'blog id');

    const blog = await this.repository.findOne(id);
    if (!blog) {
      throw new NotFoundException('Không tìm thấy blog');
    }

    return blog;
  }

  findAll(params: ParamPaginationDto) {
    const { page, limit, sort, keyword } = params;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async deleteById(id: string) {
    const blog = await this.getOne(id);

    const blogDelete = this.repository.deleteOne(blog._id.toHexString());

    return blog;
  }

  async updateById(id: string, blogDto: BlogDto) {
    checkValisIsObject(id, 'blog id');

    const blog = await this.getOne(id);
    return this.repository.updateOne(blog._id.toHexString(), blogDto);
  }

  uploadMainImage(id: Types.ObjectId, { image_id, image_url }) {
    return this.repository.uploadMainFile(id, { image_id, image_url });
  }
}
