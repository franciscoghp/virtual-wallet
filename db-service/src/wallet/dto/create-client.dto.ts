import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class RegisterClientDto {
  @IsNumber()
  @IsNotEmpty({ message: 'Document is required' })
  document: number;

  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: number;
}
