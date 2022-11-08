import React, { useEffect, useState } from "react"
import { TodoInput } from "../../components/TodoInput"
import { TodoList } from "../../components/TodoList"
import { Todo } from "../../lib/types"
import styles from '../../styles/Todo.module.css'
import Link from "next/link"
import { fetcher } from "../../lib/fetcher"
import { readFile } from "node:fs/promises"

type TodoPageProps = {
  list?: Todo[]
}


export default function TodoPage( {list} : TodoPageProps ) {
  const [todos, setTodos] = useState<Todo[]>(list || [])
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      const result = await fetcher('/api/todos')
      setTodos(result.list)
      setLoading(false)
    } 
    fetchData()
  } ,[])

  return (
    <>
      <Link href="/">Go home</Link>
      <div className={styles.layoutRow}>
        <div className={styles.wrapper}>
          <TodoInput setTodos={setTodos}/>
          {isLoading ? 'Loading' :<TodoList list={todos} setTodos={setTodos}/>}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const readData = await readFile('./pages/api/todos.json', {encoding: 'utf-8'} )
  const jsonData = JSON.parse(readData)
  return {
    props: {
      list: jsonData
    },
  };
}