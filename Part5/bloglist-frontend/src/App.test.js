import React from 'react';
import { render, waitForElement } from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

const user = {
  username: 'testMan1',
  token: '1231231214',
  name: 'Mr. TestMan',
};

describe('<App />', () => {
  test('If no users is logged in, no blogs are rendered', async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText('Login'));

    expect(component.container).toHaveTextContent('Log in to application');
    expect(component.container).not.toHaveTextContent('Blogs');
  });

  test('If user is logged in blog is rendered, but login is not', async () => {
    localStorage.setItem('userLogIn', JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);
    await waitForElement(() => component.container.querySelector('.blogs'));

    expect(component.container).toHaveTextContent('Blogs');
    expect(component.container).not.toHaveTextContent('Log in to application');

    const blogs = component.container.querySelectorAll('.noData');
    expect(blogs.length).toBe(3);
  });
});
