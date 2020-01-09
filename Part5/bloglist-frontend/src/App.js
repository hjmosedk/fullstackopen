import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Blog from './components/Blog';
import Login from './components/Login';
import Notification from './components/Notification';
import BlogForm from './components/BlogForm';
import ToggleElement from './components/ToggleElement';

const App = () => {
  const [blog, setBlog] = useState([]);
  const [notification, setNotification] = useState({ message: null });
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const blogFormRef = React.createRef();

  const getBlogList = async () => {
    const newBlogList = await blogService.getAll();
    setBlog(newBlogList);
  };
  useEffect(() => {
    getBlogList();
  }, []);

  useEffect(() => {
    const userInStorage = window.localStorage.getItem('userLogIn');
    if (userInStorage) {
      const user = JSON.parse(userInStorage);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async credentials => {
    try {
      const user = await loginService.login(credentials);
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotification({ message: 'Wrong Credential', type: 'error' });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    }
  };

  const handleLogout = event => {
    event.preventDefault();
    window.localStorage.removeItem('userLogIn');
    setUser(null);
  };

  const handleNewBlog = async event => {
    event.preventDefault();
    try {
      blogFormRef.current.toggleElementVisibilty();
      const newBlog = {
        title: `${title}`,
        author: `${author}`,
        url: `${url}`,
      };
      const addedBlog = await blogService.create(newBlog);
      getBlogList();
      setTitle('');
      setAuthor('');
      setUrl('');
      setNotification({
        message: `A new Blog ${addedBlog.title} have been added by ${user.name}`,
        type: 'information',
      });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    } catch (exception) {
      setNotification({ message: exception.message, type: 'error' });
      setTimeout(() => {
        setNotification({ message: null });
      }, 5000);
    }
  };

  const updateBlogList = async (newBlog, id) => {
    const data = await blogService.update(newBlog, id);
    const newBlogList = [...blog].map(blog =>
      blog.id === data.id ? data : blog
    );
    setBlog(newBlogList);
  };

  const removeBlog = async id => {
    await blogService.remove(id);
    getBlogList();
  };

  return (
    <div>
      <Notification notification={notification} />

      {user === null ? (
        <div>
          <h2>Log in to application</h2>
          <Login handleLogin={handleLogin} />
        </div>
      ) : (
        <div>
          <h2>Blogs</h2>
          <p>
            {user.name} has logged in{' '}
            <button type='submit' onClick={handleLogout}>
              Logout
            </button>
          </p>
          <ToggleElement buttonLabel='New Blog' ref={blogFormRef}>
            <BlogForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              url={url}
              setUrl={setUrl}
              handleNewBlog={handleNewBlog}
            />
          </ToggleElement>
          {blog
            .sort((a, b) => b.likes - a.likes)
            .map(blog => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlogList={updateBlogList}
                removeBlog={removeBlog}
                user={user}
                setNotification={setNotification}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;
