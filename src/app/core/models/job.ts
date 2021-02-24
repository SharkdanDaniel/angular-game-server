export interface Job {
  id?: string;
  name: string;
  color: string;
  canHeal: boolean;
  canArrest: true;
  canDoMarriage: true;
  isDefault: true;
  requirementXp: number;
  publicJob: boolean;
}
