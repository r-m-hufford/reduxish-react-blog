import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useState, useContext, useNavigate } from 'react';
import DataContext from './context/DataContext';
import { format } from 'date-fns';
import api from './api/posts';


const EditPost = () => {
  const navigate = useNavigate();
  const { searchResults, setPosts } = useContext(DataContext);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const { id } = useParams();
  const post = searchResults.find(post => (post.id).toString() === id);

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const resp = await api.put(`/posts/${id}`, updatedPost)
      setPosts(searchResults.map(post => post.id === id ? {...resp.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      console.error(`${error.message}`);
    }
  }
  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle])
  return (
    <main className='NewPost'>
      {editTitle &&
      <>
        <h2>Edit Post</h2>
        <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="postTitle">Title:</label>
          <input 
            type="text"
            id='postTitle'
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <label htmlFor="postBody">Post:</label>
          <textarea 
            id='postBody'
            required
            value={editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
          <button type='submit' onClick={() => handleEdit(post.id)}>Submit</button>
        </form>
      </>
      }
      {!editTitle &&
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
    </main>
  )
}

export default EditPost