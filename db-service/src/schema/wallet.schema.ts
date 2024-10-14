import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { PaymentSession } from './payment-session.schema';

@Schema()
export class Wallet extends Document {
  @Prop({ required: true, default: 0 }) // El balance es requerido y tiene un valor por defecto de 0
  balance: number;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentSession' }])
  paymentSessions: PaymentSession[];
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
