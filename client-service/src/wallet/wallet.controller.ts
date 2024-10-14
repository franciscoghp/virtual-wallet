import { Controller, Get, Post, Body, Param, Logger } from '@nestjs/common';
import { WalletClientService } from './wallet.service';
import { RpcException } from '@nestjs/microservices';

@Controller('wallet')
export class WalletClientController {
  constructor(private readonly walletClientService: WalletClientService) {}
  private readonly logger = new Logger(WalletClientController.name);
  // Registro de cliente
  @Post('register')
  async registerClient(@Body() clientData: { document: string; name: string; email: string; phone: string }) {
    try {
      return this.walletClientService.registerClient(clientData);
    } catch (error) {
      this.logger.error(`Error registering client: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  // Recargar billetera
  @Post('recharge')
  async deposit(@Body() depositData: { document: string; phone: string; amount: number }) {
    try {
      return this.walletClientService.recharge(depositData);
    } catch (error) {
      this.logger.error(`Error recharging wallet: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  // Pagar (inicio de compra, genera el token y lo envía al email)
  @Post('payment')
  async payment(@Body() paymentData: { document: string; phone: string; amount: number }) {
    try {
      return this.walletClientService.payment(paymentData);
    } catch (error) {
      this.logger.error(`Error payment: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  // Confirmar el pago usando el id de sesión y el token
  @Post('payment/confirm')
  async confirmPayment(@Body() confirmationData: { sessionId: string; token: string }) {
    try {
      return this.walletClientService.confirmPayment(confirmationData);
    } catch (error) {
      this.logger.error(`Error confirming payment: ${error.message}`);
      throw new RpcException(error.message);
    }
  }

  // Consultar saldo
  @Get('balance/:document/:phone')
  async getBalance(@Param('document') document: string, @Param('phone') phone: string) {
    try {
      return this.walletClientService.getBalance({ document, phone });
    } catch (error) {
      this.logger.error(`Error consulting balance: ${error.message}`);
      throw new RpcException(error.message);
    }
  }
}
