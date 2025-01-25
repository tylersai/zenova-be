import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginPayload {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LoginPayload;
