import { Description } from './../../../node_modules/jackspeak/dist/commonjs/index.d';
export class UpdateProductDto {
  name: string;
  description: string;
  cost: number;
  price: number;
  sale: number;
  stock: number;
  status: boolean;
  category_id: string;
  sizes: string[];
}
