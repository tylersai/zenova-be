import { PartialType } from '@nestjs/mapped-types';
import CreateProductPayload from './create-product';

class UpdateProductPayload extends PartialType(CreateProductPayload) {}

export default UpdateProductPayload;
