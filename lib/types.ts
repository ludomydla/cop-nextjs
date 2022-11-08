export type Todo = {
  id: number;
  message: string;
  checked: boolean;
}

export type BlogPost = {
  id: string;
  date: string;
  title: string;
  content?: string;
}