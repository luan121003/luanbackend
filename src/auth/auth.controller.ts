import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { LoginDto } from 'src/auth/dto/login.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('users/login')
  login(@Body() login: LoginDto) {
    return this.authService.validateUser(login);
  }

  @Post('customers/login')
  loginCustomer(@Body() login: LoginDto) {
    return this.authService.validateCustomer(login);
  }
}
