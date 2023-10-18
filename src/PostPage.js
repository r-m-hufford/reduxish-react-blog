import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const searchResults = useStoreState((state) => state.searchResults);
  const deletePost = useStoreActions((actions) => actions.deletePost);
  const getPostsById = useStoreState((state) => state.getPostsById);

  const post = getPostsById(id);

  const handleDelete = (id) => {
    deletePost(id)
    navigate('/');
  }

  return (
    <main className='PostPage'>
      <article className='post'>
        {post && 
          <>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${post.id}`} className='editButton'>Edit Post</Link>
            <button onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p>
              <Link to="/">
                Visit the Homepage
              </Link>
            </p>
          </>
        }
      </article>
    </main>
  )
}

export default PostPage