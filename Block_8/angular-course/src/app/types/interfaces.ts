export interface ITodo {
  id: number;
  text: string;
  status: boolean;
}

export interface IWebToDo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IAdditionStyles {
  boxShadow?: string;
  transition?: string;
}
