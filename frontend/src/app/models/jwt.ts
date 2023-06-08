export default interface Jwt {
  admin: boolean;
  email: string;
  exp: number;
  iat: number;
}
