import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from './context/DataContext';
import api from './api/posts';
import { useNavigate } from 'react-router-dom';

const PostPage = () => {
  const navigate = useNavigate();
  const { searchResults, setPosts } = useContext(DataContext);
  const { id } = useParams();

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postList = searchResults.filter(post => post.id !== id);
      setPosts(postList);
      navigate('/');
    } catch (error) {
      console.error(`${error.message}`);
    }
  }

  const post = searchResults.find(post => (post.id).toString() === id);

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