import React from 'react';

const BlogForm = ({
  title,
  setTitle,
  author,
  setAuthor,
  url,
  setUrl,
  handleNewBlog,
}) => {
  return (
    <div>
      <h2>Add a new blog post</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          Title:{' '}
          <input
            type='text'
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author:{' '}
          <input
            type='text'
            value={author}
            name='Author'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url:{' '}
          <input
            type='text'
            value={url}
            name='Url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type='submit'>Save</button>
        </div>
      </form>
    </div>
  );
};
export default BlogForm;
