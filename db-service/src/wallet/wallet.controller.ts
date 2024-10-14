import { Controller, InternalServerErrorException, Logger } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { WalletDbService } from './wallet.service';
import { RegisterClientDto } from './dto/create-client.dto';

@Controller()
export class WalletDbController {
  constructor(private readonly walletDbService: WalletDbService) {}
  private readonly logger = new Logger(WalletDbController.name);
  
  @MessagePattern({ cmd: 'register-client' })
  async registerClient(clientData: RegisterClientDto) {
    try {
      return await this.walletDbService.registerClient(clientData);
    } catch (error) {
      this.logger.error(`Error registering client: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  @MessagePattern({ cmd: 'recharge' })
  async deposit(depositData: { document: string; phone: string; amount: number }) {
    try {
      return await this.walletDbService.recharge(depositData);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al procesar el depósito');
    }
  }

  @MessagePattern({ cmd: 'payment' })
  async payment(paymentData: { document: string; phone: string; amount: number }) {
    try {
      return await this.walletDbService.payment(paymentData);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al procesar el pago');
    }
  }

  @MessagePattern({ cmd: 'confirm-payment' })
  async confirmPayment(confirmationData: { sessionId: string; token: string }) {
    try {
      return await this.walletDbService.confirmPayment(confirmationData);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al confirmar el pago');
    }
  }

  @MessagePattern({ cmd: 'get-balance' })
  async getBalance(balanceData: { document: string; phone: string }) {
    try {
      return await this.walletDbService.getBalance(balanceData);
    } catch (error) {
      throw new InternalServerErrorException(error.message || 'Error al consultar el saldo');
    }
  }
}
