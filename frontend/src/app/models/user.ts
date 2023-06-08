export default interface User {
  id: number;
  firstname: string;
  lastname: string;
  avatar: string | null;
  email: string;
  admin: boolean;
}
