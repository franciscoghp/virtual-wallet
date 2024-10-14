import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WalletSchema, Wallet } from './schema/wallet.schema';
import { Client, ClientSchema } from './schema/client.schema';
import { PaymentSession, PaymentSessionSchema } from './schema/payment-session.schema';
import { MailModule } from './mail/mail.module';
import { WalletDbController } from './wallet/wallet.controller';
import { WalletDbService } from './wallet/wallet.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL),
    MongooseModule.forFeature([
      { name: Wallet.name, schema: WalletSchema },
      { name: Client.name, schema: ClientSchema },
      { name: PaymentSession.name, schema: PaymentSessionSchema }
    ]),
  ],
  controllers: [WalletDbController],
  providers: [WalletDbService],
})
export class AppModule {}
