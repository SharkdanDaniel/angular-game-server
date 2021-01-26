export interface TableColumn {
  displayName: string;
  columnName: string;
  className?: string;
  dataType?: "date" | "currency";
}

export enum TableColumnDataType {}
export interface TableAction {
  iconClass: string;
  eventName?: string;
  isMenu?: boolean;
  children?: ActionMenuChildren[];
}

export interface ActionMenuChildren {
  displayName: string;
  eventName: string;
}
