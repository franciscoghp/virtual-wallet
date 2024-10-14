import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Wallet } from 'src/wallet/wallet.interface';
import * as mongoose from 'mongoose';

@Schema()
export class PaymentSession extends Document {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Wallet', required: true })
  wallet: Wallet;
}

export const PaymentSessionSchema = SchemaFactory.createForClass(PaymentSession);
