import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  // UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import CreateProductPayload from './dto/create-product';
import UpdateProductPayload from './dto/update-product';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll(@Query() filters: Record<string, string>) {
    return this.productService.findAll(filters);
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.productService.search(q);
  }

  @Get(':id')
  getById(@Param('id') id: string) {
    return this.productService.findById(id);
  }

  @Post()
  create(@Body() payload: CreateProductPayload) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductPayload) {
    return this.productService.update(id, payload);
  }

  // @UseGuards(AuthGuard)
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.productService.deleteById(id);
  }
}
