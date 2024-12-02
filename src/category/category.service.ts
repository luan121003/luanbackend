import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';
import { checkValisIsObject } from 'src/common/common';

@Injectable()
export class CategoryService {
  constructor(private readonly repository: CategoryRepository) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const { name, status, parent_id } = createCategoryDto;

    const checkParent = parent_id !== '' ? parent_id : null;

    try {
      if (parent_id !== '') {
        checkValisIsObject(parent_id, 'parent_id');

        const parent = await this.repository.findOne(parent_id);
        if (!parent) {
          throw new NotFoundException('Không tìm thấy category id');
        }
      }
      return await this.repository.create({
        name,
        status,
        parent_id: checkParent,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  findAll(param: ParamPaginationDto) {
    const { page, limit, sort, keyword } = param;

    const newSort = sort != 'asc' ? 'desc' : 'asc';

    return this.repository.findAll(page, limit, newSort, keyword);
  }

  async findById(id: string) {
    const category = await this.repository.findOne(id);
    if (!category) {
      throw new NotFoundException('không tìm thấy danh mục');
    }

    return category;
  }

  // Xoa theo id khong co danh mục con
  async deleteById(id: string) {
    const category = await this.findById(id);

    if (category.children.length > 0) {
      throw new UnprocessableEntityException(
        'Category này vẫn còn danh mục con',
      );
    }

    await this.repository.deleteOne(category._id.toHexString());

    return category;
  }

  async updateById(id: string, categoryUpdate: UpdateCategoryDto) {
    const { name, status, parent_id } = categoryUpdate;
    const checkParent = parent_id !== '' ? parent_id : null;

    const category = await this.findById(id);

    try {
      if (parent_id !== '') {
        checkValisIsObject(parent_id, 'parent_id');

        if (
          category.parent_id &&
          parent_id !== category.parent_id.toHexString()
        ) {
          const parent = await this.repository.findOne(parent_id);
          if (!parent) {
            throw new NotFoundException('Không tìm thấy category id');
          }
        }
      }
      if (category.children.length > 0) {
        throw new UnprocessableEntityException(
          'Danh muc co danh muc con, không thể thay đổi lại',
        );
      }

      return await this.repository.updateOne(id, category, {
        name,
        status,
        parent_id: checkParent,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async updateStatusById(id: string, status: boolean) {
    checkValisIsObject(id, 'category id');
    checkValisIsObject(id, 'parent_id');

    const category = await this.repository.updateStatusById(id, status);
    if (!category) {
      throw new NotFoundException('không tìm thấy id danh mục');
    }

    return category;
  }

  async findAllGetName() {
    return await this.repository.findAllGetName();
  }
}
