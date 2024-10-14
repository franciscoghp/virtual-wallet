import { Module } from '@nestjs/common';
import { WalletDbService } from './wallet.service';
import { WalletDbController } from './wallet.controller';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [ MailModule ],
  providers: [WalletDbService],
  controllers: [WalletDbController],
})
export class WalletModule {}
