import { JwtPayload } from "jwt-decode";

export interface ExtendedJwt extends JwtPayload {
  two_factor: boolean;
  user_id: number;
  email: string;
  full_name: string;
}
