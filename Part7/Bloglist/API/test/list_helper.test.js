const list_helper = require('../utils/list_helper');

const listWihtOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

const listWithALotOfBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

test('dummy returns one', () => {
  const blogs = [];

  const result = list_helper.dummy(blogs);
  expect(result).toBe(1);
});

describe('Total likes', () => {
  test('The total likes of an empty list must be zero', () => {
    const emptyBlogs = [];
    const result = list_helper.totalLikes(emptyBlogs);
    expect(result).toBe(0);
  });

  test('The total likes of one blog is equal to 5(test value)', () => {
    const result = list_helper.totalLikes(listWihtOneBlog);
    expect(result).toBe(5);
  });

  test('Correctly counting the likes', () => {
    const result = list_helper.totalLikes(listWithALotOfBlogs);
    expect(result).toBe(36);
  });
});

describe('Favorite blog', () => {
  test('A full list of blog must result in one value', () => {
    const result = list_helper.favoriteBlog(listWithALotOfBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('A list of one blog should return one blog', () => {
    const result = list_helper.favoriteBlog(listWihtOneBlog);
    expect(result).toEqual({
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    });
  });

  test('No blogs in the list, should result in zero', () => {
    const result = list_helper.favoriteBlog([]);
    expect(result).toBe(0);
  });
});

describe('Most blog ', () => {
  test('With a list of blogs, the number of blogs for one author should be returened', () => {
    const result = list_helper.mostBlogs(listWithALotOfBlogs);
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 });
  });
  test('With only one blog the result should be one', () => {
    const result = list_helper.mostBlogs(listWihtOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 });
  });
  test('With no blogs in the list, the answer must be zero', () => {
    const result = list_helper.mostBlogs([]);
    expect(result).toBe(0);
  });
});

describe('Most Likes', () => {
  test('Correcly finding most likes of blogs', () => {
    const result = list_helper.mostLikes(listWithALotOfBlogs);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
  });

  test('Only one blog should return the number of likes', () => {
    const result = list_helper.mostLikes(listWihtOneBlog);
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 });
  });

  test('When no blogs is in the list it must return 0', () => {
    const result = list_helper.mostLikes([]);
    expect(result).toBe(0);
  });
});
