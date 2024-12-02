import { Module } from '@nestjs/common';
import { CategoryController } from 'src/category/category.controller';
import { CategoryRepository } from 'src/category/category.repository';
import { CategoryService } from 'src/category/category.service';
import { Category, CategorySchema } from 'src/category/model/category.schema';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryRepository],
})
export class CategoryModule {}
