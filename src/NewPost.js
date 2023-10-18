import React from 'react';
import { useContext, useState } from 'react';
import DataContext from './context/DataContext';
import { useNavigate } from 'react-router-dom';
import api from './api/posts';
import { format } from 'date-fns';

const NewPost = () => {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const { searchResults, setPosts } = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = searchResults.length ? searchResults[searchResults.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const resp = await api.post('/posts', newPost)
      const allPosts = [...searchResults, resp.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (error) {
      console.error(`${error.message}`);
    }
  };
  return (
    <main className='NewPost'>
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input 
          type="text"
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea 
          id='postBody'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost