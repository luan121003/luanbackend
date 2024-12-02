import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { BlogDto } from 'src/blog/dto/blog.dto';
import { Blog } from 'src/blog/model/blog.schema';

@Injectable()
export class BlogRepository {
  constructor(@InjectModel(Blog.name) private readonly model: Model<Blog>) {}

  async create(blog: Blog) {
    return await this.model.create(blog);
  }

  async findOne(id: string) {
    return await this.model.findOne({ _id: id }).lean<Blog>(true);
  }

  async findAll(
    page: number,
    limit: number,
    sort: 'asc' | 'desc',
    keyword: any,
  ) {
    return await this.model
      .find(keyword ? { $or: [{ title: new RegExp(keyword, 'i') }] } : {})
      .skip((page - 1) * limit)
      .sort({ name: sort })
      .limit(limit)
      .lean<Blog[]>(true);
  }

  async deleteOne(id: string) {
    return await this.model.findOneAndDelete({ _id: id }).lean<Blog>(true);
  }

  async updateOne(_id: string, blog: BlogDto) {
    return await this.model
      .findOneAndUpdate({ _id }, blog, {
        new: true,
      })
      .lean<Blog>(true);
  }

  async uploadMainFile(
    id: Types.ObjectId,
    { image_id, image_url }: { image_id: string; image_url: string },
  ) {
    return await this.model
      .findOneAndUpdate({ _id: id }, { image_id, image_url }, { new: true })
      .lean<Blog>(true);
  }
}
