import { Server } from './server';
export interface Disease {
  id?: string;
  name: string;
  damageEachTenMinutes: number;
  durationInMinutes: number;
  contagious: boolean;
  hasVacine: boolean;
  vacinePrice: number;
  server?: Server;
}
