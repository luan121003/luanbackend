import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { ParamPaginationDto } from 'src/common/param-pagination.dto';

// Hàm kiểm tra Id
export const checkValisIsObject = (id: string, name: string) => {
  const idValid = Types.ObjectId.isValid(id);
  if (!idValid) {
    throw new UnprocessableEntityException(`${name} khong hop le`);
  }
};

// Hàm trả dữ liệu phân trang
export const buildPagination = <T>(
  listEnties: T[],
  param: ParamPaginationDto,
  categoryHierachical?: T[],
) => {
  const { page, limit } = param;

  return {
    total_items: listEnties.length,
    total_pages: Math.ceil(listEnties.length / limit),
    current_page: parseInt(String(page)),
    entities: categoryHierachical ?? listEnties,
  };
};

// Hàm kiểm tra file image
export const checkFileImage = (files: {
  main_image: Express.Multer.File[];
  extra_images: Express.Multer.File[];
}) => {
  const validImageExtensions = /\.(jpg|jpeg|png|)$/i;

  if (files.main_image) {
    const originName = files.main_image[0].originalname;

    if (!validImageExtensions.test(originName)) {
      throw new BadRequestException('Chỉ nhận file jpg,jpeg,png!');
    }
  }

  if (files.extra_images) {
    files.extra_images.forEach((file) => {
      const originName = file.originalname;
      if (!validImageExtensions.test(originName)) {
        throw new BadRequestException('Chỉ nhận file jpg,jpeg,png!');
      }
    });
  }
};

export const checkMainFile = (file: Express.Multer.File) => {
  const validImageExtensions = /.(jpg|jpeg|png|)$/i;
  const originName = file.originalname;
  if (!validImageExtensions.test(originName)) {
    throw new BadRequestException('Chọn file jpg,jpeg,png!');
  }
};

export const checkExtraFiles = (files: Express.Multer.File[]) => {
  const validImageExtensions = /.(jpg|jpeg|png|)$/i;
  if (files) {
    files.forEach((file) => {
      const originName = file.originalname;
      if (!validImageExtensions.test(originName)) {
        throw new BadRequestException('Chỉ nhận file jpg,jpeg,png!');
      }
    });
  }
};
