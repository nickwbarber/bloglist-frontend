import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

const blog = {
  id: '5f7b6b3b1c9d440000b0d1a1',
  title: 'Component testing is done with react-testing-library',
  author: 'Test Author',
  url: 'http://localhost:3000',
  user: 'testusername',
  likes: 14,
};

mockLikeBlog = jest.fn();
mockDeleteBlog = jest.fn();

let renderedBlog;
let container;

beforeEach(() => {
  renderedBlog = render(
    <Blog blog={blog} likeBlog={mockLikeBlog} deleteBlog={mockDeleteBlog} />,
  );
  container = renderedBlog.container;
});

test('renders content', () => {
  expect(container.querySelector('.blogContent')).toHaveTextContent(
    /.*Component testing is done with.*/,
  );
});

test('url and likes default to hidden', async () => {
  expect(container.querySelector('.whenVisible')).toHaveStyle('display: none');
  expect(container.querySelector('.whenHidden')).not.toHaveStyle(
    'display: none',
  );
});

test("url and likes are shown after the 'show' button is pressed", async () => {
  const showButton = screen.getByText('show blog');
  userEvent.click(showButton);

  expect(container.querySelector('.whenVisible')).not.toHaveStyle(
    'display: none',
  );
  expect(container.querySelector('.whenHidden')).toHaveStyle('display: none');
});

test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const showButton = screen.getByText('show blog');
  userEvent.click(showButton);

  const likeButton = screen.getByText('like');
  userEvent.click(likeButton);
  userEvent.click(likeButton);

  expect(mockLikeBlog.mock.calls).toHaveLength(2);
});

test("url and likes are shown after the 'show' button is pressed", async () => {});
