import React, { useEffect, useState, ReactElement } from 'react';
import { getPosts } from '../container/axiosContainer'
import { IndexState, Posts, PostsList, PostsState } from '../interface';

export const Home: React.FC<IndexState> = (props) => {
  const [posts, setPosts] = useState<PostsState>({
    data: [{id: -1, user_id: -1, message: ''}]
  })

  // function createPost(): void {
  //   getPosts(setPosts)
  // }

  useEffect((): void => {
    getPosts(setPosts)
  }, [])

  let status;
  status = (
    props.loggedInStatus ? (
      <h2>Status: Logged In</h2>
    ) : (
      <h2>Status: Need Login</h2>
    )
  )
  return (
    <div className="ac">
      <h1>Home</h1>
      {status}
      <h2>User: {props.user.email}</h2>
      {posts.data.map((post: Posts): ReactElement => {
        return (
          <div className="p-box" key={post.id}>
            <div className="p-box-in">
              <p className="content-img"></p>
              <p className="content-1">{post.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
