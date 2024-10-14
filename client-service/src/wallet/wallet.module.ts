import { Module } from '@nestjs/common';
import { WalletClientService } from './wallet.service';
import { WalletClientController } from './wallet.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DB_SERVICE',
        transport: Transport.TCP,
      },
    ]),
  ],
  controllers: [WalletClientController],
  providers: [ WalletClientService ],
})
export class WalletModule {}
