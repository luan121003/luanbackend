import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { CustomerModule } from 'src/customer/customer.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret:
          'vVarX3ETLuR35pAe8LLVSEieaIxvBrz6X2B0eiN1HY4cdf3jYwBUKISJhDDXD60gsZiL9HLTYPoVwrSGa628XGmjJkGF04J3f4On',
        signOptions: {
          expiresIn: '24h',
          algorithm: 'HS256',
        },
      }),
    }),
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
