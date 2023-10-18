import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { format } from 'date-fns';


const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const editTitle = useStoreState((state) => state.editTitle);
  const editBody = useStoreState((state) => state.editBody);
  
  const setEditBody = useStoreActions((actions) => actions.setEditBody);
  const setEditTitle = useStoreActions((actions) => actions.setEditTitle);
  const editPost = useStoreActions((actions) => actions.editPost);
  
  const getPostsById = useStoreState((state) => state.getPostsById);
  const post = getPostsById(id)

  const handleEdit = (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    editPost(updatedPost);
    navigate(`/post/${id}`);
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