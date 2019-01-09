/* @flow */
export type Question =
  {| +creation_date: Date
  ,  +question_id: string
  ,  +link: string
  ,  +state: 'SOLVED' | 'UNSOLVED' | 'NOTKNOW'
  ,  +bounty: number | 'NOTKNOW'
  ,  +title: string
  |}
