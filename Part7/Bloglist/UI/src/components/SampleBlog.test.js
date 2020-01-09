import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

const blog = {
  title: 'This is a blogtitle',
  author: 'Jens Hansen Vestergaard',
  likes: 25,
};

describe('SimpleBlog testing', () => {
  test('Blog is correcly rendered', () => {
    const component = render(<SimpleBlog blog={blog} />);

    expect(component.container).toHaveTextContent(
      `${blog.title} ${blog.author}`
    );
    expect(component.container).toHaveTextContent(
      `blog has ${blog.likes} likes`
    );
  });

  test('The like button is fired twice when clicked twice', () => {
    const testClickHandler = jest.fn();

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={() => testClickHandler()} />
    );

    const button = getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(testClickHandler.mock.calls.length).toBe(2);
  });
});
