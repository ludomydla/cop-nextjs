import React, { useEffect, useState } from "react"
import { TodoInput } from "../../components/TodoInput"
import { TodoList } from "../../components/TodoList"
import { BlogPost, Todo } from "../../lib/types"
import styles from '../../styles/Todo.module.css'
import Link from "next/link"
import { fetcher } from "../../lib/fetcher"
import { readFile } from "node:fs/promises"
import { getAllPostId, getPostData } from "../../lib/utils"

type BlogPageProps = {
  post: BlogPost
}

export default function BlogPage( {post} : BlogPageProps ) {

  return (
    <>
    <Link href="/blog">Go back to blogs</Link>
      <h1>{post.title}</h1>
      <i>{post.date}</i>
      <p>{post.content}</p>
    </>
  )
}

export async function getStaticPaths() {
  const allPostsPaths = await getAllPostId();
  return {
    paths: allPostsPaths,
    fallback: false
  }
}

export async function getStaticProps({params} : any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      post: postData
    }
  };
}