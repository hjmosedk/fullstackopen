const blogs = [
  {
    id: '5df3f538498fc90bd0b38684',
    title: 'I Want this blog to have a titel',
    author: 'Christian Kubel Højmose',
    user: {
      id: '5df3fa5c95264c4fe01d94be',
      username: 'hjmose',
      name: 'Christian Kubel Højmose',
    },
    url: 'hjmose.dk',
    likes: 5,
  },
  {
    id: '5df3fd17cbf28619181c037a',
    title: 'This is the 2nd blog',
    author: 'Jens Hansen',
    user: {
      id: '5df3fa5c95264c4fe01d94be',
      username: 'hjmose',
      name: 'Christian Kubel Højmose',
    },
    url: 'dr.dk',
    likes: 15,
  },
  {
    id: '5df3fd17cbf28619181c038a',
    title: 'This is the 3rd blog',
    author: 'Ulla Hougaard',
    user: {
      id: '5df3fa5c95264c4fe01d94be',
      username: 'hjmose',
      name: 'Christian Kubel Højmose',
    },
    url: 'tv2.dk',
    likes: 25,
  },
];

const setToken = () => {};

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
