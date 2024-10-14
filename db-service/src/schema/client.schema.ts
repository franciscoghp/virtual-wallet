import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Wallet } from 'src/wallet/wallet.interface';
import * as mongoose from 'mongoose';

@Schema()
export class Client extends Document {
  @Prop({ required: true })
  document: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' })
  wallet: Wallet;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
