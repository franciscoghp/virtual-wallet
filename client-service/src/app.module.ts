import { Module } from '@nestjs/common';
import { WalletModule } from './wallet/wallet.module';
// import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ WalletModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
