export interface ExpMachine {
  id?: string;
  description: string;
  expEachMinute: number;
  automaticStart: boolean;
  hourStart: string;
  hourEnds: string;
  enabled: boolean;
}
