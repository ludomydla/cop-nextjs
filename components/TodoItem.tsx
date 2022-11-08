import { Todo } from "../lib/types";
import { Checkbox } from "./Checkbox";
import styles from '../styles/Todo.module.css'

interface TodoItemProps extends React.HTMLProps<HTMLLIElement>{
  item: Todo;
  onCompleteTodo: (id: number)=> void;
  onDeleteTodo: (id: number)=> void;
}

export const TodoItem = ({item, onCompleteTodo, onDeleteTodo, ...props}: TodoItemProps) => {

  return (
    <li {...props}>
      <Checkbox isChecked={item.checked} onToggle={() => onCompleteTodo(item.id)}/>
      <div className={item.checked ? styles.listContentChecked : styles.listContent}>{item.message}</div>
      <button onClick={() => onDeleteTodo(item.id)}>&times;</button>
    </li>
  )
}