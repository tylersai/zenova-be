import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly productService: ProductService) {}

  @Get(':category/product')
  getProductsByCategory(@Param('category') category: string) {
    return this.productService.findByCategory(category);
  }
}
