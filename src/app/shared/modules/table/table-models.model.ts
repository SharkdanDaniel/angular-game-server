export interface TableColumn {
  displayName: string;
  columnName?: string;
  columnOptional?: any;
  className?: string;
}

export interface TableAction {
  iconClass: string;
  eventName?: string;
  disabledName?: string
  isDisabled?: boolean;
  isMenu?: boolean;
  children?: ActionMenuChildren[];
}

export interface ActionMenuChildren {
  displayName: string;
  eventName: string
}