import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './types';

const postsDirectory = path.join(process.cwd(), 'blog', );

export async function getAllPostId() {
  const fileNames = await fs.promises.readdir(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = await fs.promises.readFile(fullPath, 'utf8');
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
    content: matterResult.content
  };
}


export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = await fs.promises.readdir(postsDirectory);
  const allPostsData: BlogPost[] = [];
  for(let i=0; i< fileNames.length; i++ ) {
    const fileName = fileNames[i];
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = await fs.promises.readFile(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);
    const postToUse = {
      id,
      ...matterResult.data,
    } as BlogPost

    allPostsData.push(postToUse)
  }

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}
