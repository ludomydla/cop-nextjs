import React, { useEffect, useState } from "react"
import { TodoInput } from "../../components/TodoInput"
import { TodoList } from "../../components/TodoList"
import { BlogPost, Todo } from "../../lib/types"
import styles from '../../styles/Todo.module.css'
import Link from "next/link"
import { fetcher } from "../../lib/fetcher"
import { readFile } from "node:fs/promises"
import { getSortedPostsData } from "../../lib/utils"

type BlogPageProps = {
  allPostsData: BlogPost[]
}

export default function BlogPage( {allPostsData} : BlogPageProps ) {
  //const [todos, setTodos] = useState<Todo[]>(list || [])
  //const [isLoading, setLoading] = useState<boolean>(true)

  // useEffect( () => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     const result = await fetcher('/api/todos')
  //     setTodos(result.list)
  //     setLoading(false)
  //   } 
  //   fetchData()
  // } ,[])

  return (
    <>
      <Link href="/">Go home</Link>
      <h1>Blog</h1>
        <ul>
          {allPostsData.map(({ id, date, title }: BlogPost) => (
            <li key={id}>
              <Link href={`blog/${id}`}>{title}</Link>
              <br />
              {date}
            </li>
          ))}
        </ul>
    </>
  )
}

export async function getStaticProps() {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}