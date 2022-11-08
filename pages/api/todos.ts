// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readFile } from 'node:fs/promises';
import type { NextApiRequest, NextApiResponse } from 'next'
import { Todo } from '../../lib/types'

type Data = {
  list: Todo[]
}

type Error = {
  msg: string|object
}

const getResponse = (res: NextApiResponse<Data | Error>) => {
  readFile('./pages/api/todos.json', {encoding: 'utf-8'}, )
  .then( (data) => {
    const result = JSON.parse(data)
    res.status(200).json({ list: result })
  }, (err) => {
    res.status(500).json({ msg: err })
  } )
}

const postResponse = (req: NextApiRequest, res: NextApiResponse<Data | Error>) => {
  readFile('./pages/api/todos.json', {encoding: 'utf-8'}, )
  .then( (data) => {
    console.log('SUCCESS', data)
    const result = JSON.parse(data)
    res.status(200).json({ list: result })
  }, (err) => {
    res.status(500).json({ msg: err })
  } )
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Error>
) {
  switch (req.method) {
    case 'GET': getResponse(res); break;
    case 'POST': postResponse(req, res); break;
    default: res.status(500).json({ msg: `This interface doesn't support method ${req.method}` })
  }
}
