import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { isValidObjectId, Model } from 'mongoose';
import { RespMessage } from 'src/types';
import CreateProductPayload from './dto/create-product';
import UpdateProductPayload from './dto/update-product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(filters: Record<string, string>): Promise<Product[]> {
    const query: Record<string, any> = {};
    if (filters.name) {
      query.name = { $regex: filters.name, $options: 'i' };
    }
    if (filters.description) {
      query.description = { $regex: filters.description, $options: 'i' };
    }
    return this.productModel.find(query).exec();
  }

  async findById(id: string): Promise<Product> {
    if (isValidObjectId(id)) {
      const product = this.productModel.findById(id).exec();
      if (product) return product;
      else throw new NotFoundException();
    } else throw new NotFoundException();
  }

  async create(productPayload: CreateProductPayload): Promise<Product> {
    if (!productPayload.originalPrice) {
      productPayload.originalPrice = productPayload.price;
    }
    const saved = await new this.productModel(productPayload).save();
    return saved;
  }

  async update(
    id: string,
    productPayload: UpdateProductPayload,
  ): Promise<Product> {
    const product = await this.findById(id);
    Object.assign(product, productPayload);
    const updated = await product.save();
    return updated;
  }

  async deleteById(id: string): Promise<RespMessage> {
    if (isValidObjectId(id)) {
      const result = await this.productModel.deleteOne({ _id: id }).exec();
      if (result.deletedCount === 1) {
        return {
          statusCode: HttpStatus.OK,
          message: 'Deleted successfully',
        };
      } else throw new NotFoundException();
    } else throw new NotFoundException();
  }
}
