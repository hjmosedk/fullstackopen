import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const user = {
  username: 'Test',
  name: 'TestMan',
};

const blog = {
  title: 'This is a test blog',
  author: 'Jens Hansen Vestergaard',
  url: 'www.hjmose.dk',
  user: user,
  likes: 25,
};
// to be able to reuse the test, the render, and selector have been move out od the test.

const component = render(<Blog blog={blog} user={user} />);
const noData = component.container.querySelector('.noData');
const allData = component.container.querySelector('allData');

describe('Initial test of blog component', () => {
  test('Full data is not initially shown', () => {
    expect(noData).toBeVisible;
    expect(allData).not.toBeVisible;
  });
  test('Full data is ready after click', () => {
    fireEvent.click(component.container);

    expect(noData).not.toBeVisible;
    expect(allData).toBeVisible;
  });
  test('Data is once again removed after another click', () => {
    fireEvent.click(component.container);

    expect(noData).toBeVisible;
    expect(allData).not.toBeVisible;
  });
});
