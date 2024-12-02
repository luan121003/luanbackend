import { Module } from '@nestjs/common';
import { BlogController } from 'src/blog/blog.controller';
import { BlogRepository } from 'src/blog/blog.repository';
import { BlogService } from 'src/blog/blog.service';
import { Blog, BlogSchema } from 'src/blog/model/blog.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    CloudinaryModule,
  ],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogModule {}
