import { Server } from './server';

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  permission: number;
  server?: Server;
}
