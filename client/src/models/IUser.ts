import {IPost} from './IPost';

export interface IUser {
  id: string
  username: string
  age: number
  posts: IPost[]
}