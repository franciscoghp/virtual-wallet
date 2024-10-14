import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() { }

  async sendMail(to: string, subject: string, text: string, html: string) {
    try {
      // Configura tu servicio de correo aquí (Gmail, SMTP, etc.)
      this.transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST || 'smtp.gamil.com', // Usar el host de tu proveedor de correo
        port: parseInt(process.env.MAIL_PORT) || 587,
        secure: false, // true para 465, false para otros puertos
        auth: {
          user: process.env.MAIL_USER, // Correo electrónico del remitente
          pass: process.env.MAIL_PASS, // Contraseña o API Key del servicio de correo
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      const mailOptions = {
        from: process.env.MAIL_USER, // El correo que envía el email
        to,                          // Destinatario
        subject,                     // Asunto del correo
        text,                        // Texto plano (opcional)
        html,                        // Contenido HTML del correo
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log(`Correo enviado: ${info.messageId}`);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new InternalServerErrorException('Error al enviar el correo');
    }
  }
}
