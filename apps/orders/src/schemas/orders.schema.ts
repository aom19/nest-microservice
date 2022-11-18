import { AbstractDocument } from '@app/common';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  versionKey: false,
})
export class Orders extends AbstractDocument {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  phoneNumber: string;
}
