import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumberString,
} from 'class-validator';

class CreateProductPayload {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumberString()
  price: number;

  @IsNumberString()
  @IsOptional()
  stock?: number;
}

export default CreateProductPayload;
