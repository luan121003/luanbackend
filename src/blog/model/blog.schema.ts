import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ versionKey: false })
export class Blog {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: Date, default: Date.now() })
  created_at?: Date;

  @Prop({ type: String, required: true })
  created_by: string;

  @Prop({ default: '' })
  image_id?: string;

  @Prop({ default: '' })
  image_url?: string;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
