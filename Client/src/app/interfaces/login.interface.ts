export interface Login{
  data: [
    {
      adminID: number;
      email: string;
      password: string;
    }
  ],
  login: boolean;
  message: string;
}
