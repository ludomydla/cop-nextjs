import { Dispatch, SetStateAction } from "react";
import { Todo } from "../lib/types";
import { TodoItem } from "./TodoItem";
import styles from '../styles/Todo.module.css'

interface TodoListProps {
  list: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoList = ({list, setTodos}: TodoListProps) => {

  const handleCompleteTodo = (id: number) => {
    console.log('handleCompleteTodo', id, list)
    const itemToToggle = (list.find((item) => item.id === id) as Todo)
    itemToToggle.checked = !itemToToggle?.checked
    setTodos([...list])
  }

  const handleDeleteTodo = (id: number) => {
    const newTodos = list.filter( item => item.id != id)
    setTodos([...newTodos])
  }

  const sortChecked = (a: Todo, b: Todo) => {
    if(a.checked === b.checked) {
      return b.id - a.id;
    } else return Number(a.checked) - Number(b.checked);
  }

  return (
    <ul className={styles.list}>
      {list.sort(sortChecked).map( item => <TodoItem key={item.id} item={item} onCompleteTodo={handleCompleteTodo} onDeleteTodo={handleDeleteTodo} />)}
    </ul>
  )
}