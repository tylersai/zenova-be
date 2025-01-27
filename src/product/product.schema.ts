import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
})
export class Product extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  price: number;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  originalPrice: number;

  @Prop({
    type: String,
    required: false,
  })
  category?: string;

  @Prop({
    type: String,
    required: false,
  })
  imageUrl?: string;

  @Prop({
    type: Number,
    default: 0,
    min: 0,
  })
  rating: number;

  @Prop({
    type: Number,
    default: 1,
    min: 0,
  })
  stock: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  isNewlyAdded: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
