import React, { useState } from 'react';

const Blog = ({ blog, updateBlogList, removeBlog, user, setNotification }) => {
  const [blogAllData, setBlogAllData] = useState(false);
  const noData = { display: blogAllData ? 'none' : '' };
  const allData = { display: blogAllData ? '' : 'none' };

  const blogstyle = {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    border: 'solid',
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 2.5,
  };

  const toggleAllData = () => {
    setBlogAllData(!blogAllData);
  };

  const handleAddLike = () => {
    const updatedBlog = { ...blog };
    updatedBlog.likes += 1;
    updatedBlog.user = blog.user.id;
    updateBlogList(updatedBlog, updatedBlog.id);
  };

  const handleRemove = () => {
    window.confirm(
      `Do you really want to remove ${blog.title} by ${blog.author}?`
    );
    removeBlog(blog.id);
    setNotification({
      message: `${blog.title} by ${blog.author} removed`,
      type: 'information',
    });
    setTimeout(() => {
      setNotification({ message: null });
    }, 5000);
  };

  return (
    <div style={blogstyle} className='blogs'>
      <div style={noData} onClick={toggleAllData} className='noData'>
        <div>
          {blog.title} by {blog.author}
        </div>
      </div>
      <div style={allData} onClick={toggleAllData} className='allData'>
        <p>
          {blog.title} by {blog.author}
        </p>
        <p>
          <a href={blog.url}>{blog.url}</a>
        </p>
        <p>
          {blog.likes} likes <button onClick={handleAddLike}>Like</button>
        </p>
        <p>Added by: {blog.user.name}</p>
        {user.username === blog.user.username && (
          <button onClick={handleRemove}>Remove blog</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
