import { Injectable, NotFoundException, InternalServerErrorException, ConflictException, Logger, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from '../schema/wallet.schema';
import { Client } from '../schema/client.schema';
import { RegisterClientDto } from './dto/create-client.dto';
import { RpcException } from '@nestjs/microservices';
import { PaymentSession } from 'src/schema/payment-session.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class WalletDbService {
  constructor(
    @InjectModel(Client.name) private readonly clientModel: Model<Client>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
    @InjectModel(PaymentSession.name) private paymentSessionModel: Model<PaymentSession>,
    private mailService: MailService, // Servicio de email que enviarás el token
  ) {}

  private readonly logger = new Logger(WalletDbService.name); // Agrega un logger
  
  async registerClient(clientData: RegisterClientDto) {
    try {
      const existingClient = await this.clientModel.findOne({ document: clientData.document });
      if (existingClient) {
        throw new RpcException(new ConflictException('Client with this document already exists'));
      }

      const newWallet = new this.walletModel({ balance: 0 });
      const wallet = await newWallet.save();
      const newClient = new this.clientModel({ ...clientData, wallet });
      return await newClient.save();
    } catch (error) {
      this.logger.error(`Error registering client: ${error.message}`, error.stack);
      throw new RpcException(error.message);
    }
  }

  async recharge(depositData: { document: string; phone: string; amount: number }) {
    try {

      const client = await this.clientModel.findOne({ document: Number(depositData.document), phone: Number(depositData.phone) });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      
      const wallet = await this.walletModel.findById(client.wallet);
      if (!wallet) {
        throw new NotFoundException('Wallet not found');
      }

      wallet.balance += Number(depositData.amount);
      return await wallet.save();
    } catch (error) {
      throw new InternalServerErrorException('Error processing deposit', error.message);
    }
  }

  // Crear una nueva sesión de pago
  async payment(paymentData: { document: string; phone: string; amount: number }) {
    try {
      // Buscar al cliente y su billetera
      const client = await this.clientModel.findOne({ document: Number(paymentData.document), phone: Number(paymentData.phone) });
      if (!client) {
        throw new BadRequestException('Client not found');
      }

      // Verificar si hay saldo suficiente
      if (client.wallet.balance < paymentData.amount) {
        throw new Error('Insufficient funds');
      }

      // Generar un token de 6 dígitos
      const token = this.generateToken();
      const sessionId = crypto.randomUUID(); // ID único para la sesión
      
      // Crear una nueva sesión de pago
      const paymentSession = new this.paymentSessionModel({
        sessionId,
        token,
        amount: paymentData.amount,
        wallet: client.wallet._id, // Relacionamos con la billetera
      });
      
      // Guardar la sesión de pago
      await paymentSession.save();
      
      // Enviar el token por correo
      await this.sendTokenToEmail(client.email, token);

      return {
        message: 'Se ha enviado un correo con el token de confirmación',
        sessionId,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error processing payment', error.message);
    }
  }

  // Generador de token de 6 dígitos
  private generateToken(): string {
    const min = 100000;
    const max = 999999;
    return Math.floor(Math.random() * (max - min + 1)) + min + '';
  }

  private async sendTokenToEmail(email: string, token: string) {
    const subject = 'Tu token de confirmación de pago';
    const text = `Usa el siguiente token para confirmar tu pago: ${token}`;
    const html = `<p>Usa el siguiente token para confirmar tu pago: <strong>${token}</strong></p>`;

    await this.mailService.sendMail(email, subject, text, html);
  }

  async confirmPayment(confirmData: { sessionId: string; token: string }) {
    try {
      // Buscar la sesión de pago por sessionId y token
      const paymentSession = await this.paymentSessionModel.findOne({
        sessionId: confirmData.sessionId,
        token: confirmData.token,
      }).populate('wallet'); // Traer la billetera asociada
  
      if (!paymentSession) {
        throw new NotFoundException('Session not found or token invalid');
      }
  
      const wallet = paymentSession.wallet;
  
      // Restar el monto de la billetera
      wallet.balance -= paymentSession.amount;
      await wallet.save();
  
      // Eliminar la sesión de pago una vez confirmada
      await this.paymentSessionModel.deleteOne({ _id: paymentSession._id });
  
      return { message: 'Compra confirmada y saldo descontado' };
    } catch (error) {
      throw new InternalServerErrorException('Error confirming payment', error.message);
    }
  }

  async getBalance(balanceData: { document: string; phone: string }) {
    try {
      const client = await this.clientModel.findOne({ document: balanceData.document, phone: balanceData.phone });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
      const wallet = await this.walletModel.findById(client.wallet);
      return { balance: wallet.balance };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving balance', error.message);
    }
  }
}
