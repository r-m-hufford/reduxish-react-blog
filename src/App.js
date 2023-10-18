import Layout from './Layout'
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Routes } from 'react-router-dom';
import EditPost from './EditPost';

function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home />} />
        <Route path='post'>
          <Route index element={<NewPost />} />
          <Route path=':id' element={<PostPage />} />        
        </Route>
        <Route path='edit/:id'>
          <Route index element={<EditPost />} />      
        </Route>
        <Route path='*' element={<Missing />}/>
        <Route path='about' element={<About />}/>
      </Route>
    </Routes>
  );
}

export default App;
