export type TCardId = string;

export type TCard = {
  id: TCardId;
  title: string;
  checked: boolean;
  create_ad: Date | string;
  number: number;
  order?: number;
};

export type TTasksState = Record<TCardId, TCard>;
