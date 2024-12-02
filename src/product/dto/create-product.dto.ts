import { Max, Min } from 'class-validator';

export class CreateProductDto {
  name: string;

  description: string;

  cost: number;

  price: number;

  //   @Max(100)
  //   @Min(0)
  sale: number;

  stock: number;

  status: boolean;

  category_id: string;

  sizes: string[];
}
