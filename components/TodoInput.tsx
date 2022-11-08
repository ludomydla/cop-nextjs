import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Todo } from "../lib/types"
import styles from '../styles/Todo.module.css'

interface TodoInputProps {
  //setTodos: (setCallback: (currentTodos: Todo[]) => void) => void;
  setTodos: Dispatch<SetStateAction<Todo[]>>;  
}

export const TodoInput = ({setTodos}: TodoInputProps) => {
  const [todoText, setTodoText] = useState<string>('')

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {setTodoText(event.target.value)}

  const addTodo = () => {
    setTodos((currentTodos: Todo[]) => {
      currentTodos.push({
        id: currentTodos.length + 1,
        message: todoText,
        checked: false
      })
      return [...currentTodos]
    });
    setTodoText('')
  }

  return (
    <div className={styles.input}>
      <input 
        value={todoText}
        onChange={handleOnChange}
        onKeyDown={(event) => {
          if(event.key === 'Enter' && todoText.length > 0) addTodo()
        }}
      />
      <button onClick={addTodo} disabled={todoText.length <= 0}>{'+'}</button>
    </div>
  )
}