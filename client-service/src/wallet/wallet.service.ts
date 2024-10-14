import { Injectable, Inject, InternalServerErrorException, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class WalletClientService {
  constructor(
    @Inject('DB_SERVICE') private readonly client: ClientProxy, // Cliente proxy para el servicio de base de datos
  ) {}
  private readonly logger = new Logger(WalletClientService.name);
  // Registrar cliente
  async registerClient(clientData: { document: string; name: string; email: string; phone: string }) {
    try {
      await this.client.send({ cmd: 'register-client' }, clientData).toPromise();
      return { success: true, message: 'Client registration emitted successfully' };
    } catch (error) {
      this.logger.error(`Error in registerClient: ${error.message}`);
      throw new InternalServerErrorException(error.message || 'Error al recargar la billetera'); // Reenvía el error hacia el frontend
    }
  }

  // Recargar billetera
  async recharge(depositData: { document: string; phone: string; amount: number }) {
    try {
      await this.client.send({ cmd: 'recharge' }, depositData).toPromise();
      return { success: true, message: 'Wallet recharged emitted successfully' };
    } catch (error) {
      this.logger.error(`Error in recharge wallet: ${error.message}`);
      throw new InternalServerErrorException(error.message || 'Error al recargar la billetera');
    }
  }

  // Iniciar el proceso de pago
  async payment(paymentData: { document: string; phone: string; amount: number }) {
    try {
      return this.client.send({ cmd: 'payment' }, paymentData).toPromise();
    } catch (error) {
      this.logger.error(`Error in payment: ${error.message}`);
      throw new InternalServerErrorException(error.message || 'Error al procesar el pago');
    }
  }

  // Confirmar el pago
  async confirmPayment(confirmationData: { sessionId: string; token: string }) {
    try {
      return this.client.send({ cmd: 'confirm-payment' }, confirmationData).toPromise();
    } catch (error) {
      this.logger.error(`Error in confirming payment: ${error.message}`);
      throw new InternalServerErrorException(error.message || 'Error al confirmar el pago');
    }
  }

  // Consultar saldo
  async getBalance(balanceData: { document: string; phone: string }) {
    try {
      return this.client.send({ cmd: 'get-balance' }, balanceData).toPromise();
    } catch (error) {
      this.logger.error(`Error in consulting balance: ${error.message}`);
      throw new InternalServerErrorException(error.message || 'Error al consultar el saldo');
    }
  }
}
