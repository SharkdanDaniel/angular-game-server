import { Parcel } from './parcel';
import { Disease } from './disease';
import { Item } from './item';
import { ExpTable } from './exp-table';

export interface Server {
  id?: string;
  name: string;
  token?: string;
  shared: boolean;
  hasDisease: boolean;
  initialMoney: number;
  initialStatsPoints: number;
  expTable: ExpTable[];
  availableItems: Item[];
  availableDisease: Disease[];
  parcels: Parcel[];
}
