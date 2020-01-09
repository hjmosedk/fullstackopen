const _ = require('lodash');

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    return 1;
  }
};

const totalLikes = (blogs) =>
// if (blogs.length === 0) {
//	return 0;
// }

// if (blogs.length == 1) {
//	return blogs[0].likes;
// }

// if (blogs.length > 1) {
	 (blogs.length === 0
    ? 0
    : blogs.map((blog) => blog.likes).reduce((sum, likes) => sum + likes))
// }
;

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const filteredBlogs = blogs.filter(
    (blog) => blog.likes
			=== blogs
			  .map((blog) => blog.likes)
			  .reduce((oldValue, newValue) => Math.max(oldValue, newValue)),
  );

  ({
    _id, url, __v, ...mostLikedBlog
  } = filteredBlogs[0]);

  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const reducer = (previousValue, newValue) => (findMostActiveauthor[previousValue] > findMostActiveauthor[newValue]
    ? previousValue
    : newValue);

  const findMostActiveauthor = _.countBy(blogs, 'author');
  const author = Object.keys(findMostActiveauthor).reduce(reducer, 0);
  const noOfBlogs = Object.values(findMostActiveauthor).reduce(reducer, 0);

  return { author, blogs: noOfBlogs };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const countedObject = Object.entries(
    blogs
      .map((blog) => ({ author: blog.author, likes: blog.likes }))
      .reduce((newValue, oldValue) => {
        newValue[oldValue.author] =					newValue[oldValue.author] === undefined
          ? oldValue.likes
          : oldValue.likes + newValue[oldValue.author];
        return newValue;
      }, {}),
  ).sort((newValue, oldValue) => oldValue[1] - newValue[1]);

  return { author: countedObject[0][0], likes: countedObject[0][1] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
