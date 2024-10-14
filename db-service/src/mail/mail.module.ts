import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  exports: [MailService], // Asegúrate de exportarlo si lo vas a usar en otros módulos
})
export class MailModule {}
