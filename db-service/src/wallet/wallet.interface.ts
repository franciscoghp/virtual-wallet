import { Document } from 'mongoose';
import { PaymentSession } from 'src/schema/payment-session.schema';

export interface Wallet extends Document {
  balance: number;
  currency?: string;
  paymentSessions?: PaymentSession[];
}
