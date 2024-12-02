import { IsBoolean, IsEmail, IsString, IsStrongPassword } from "class-validator";

export class CreateCustomerDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsString()
    address: string;

    @IsString()
    phone_number: string;

    @IsString()
    gender: string;

    @IsBoolean()
    status: boolean;
  }