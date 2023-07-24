import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

let renderedBlogForm;
let container;
let submitButton;

mockAddBlog = jest.fn();

beforeEach(() => {
  renderedBlogForm = render(<BlogForm addBlog={mockAddBlog} />);
  container = renderedBlogForm.container;
  submitButton = screen.getByText("submit blog");
});

describe("<BlogForm />", () => {

  test("form is rendered", () => {
    expect(container.querySelector(".BlogForm")).toBeDefined();
  });

  test("button is rendered", () => {
    expect(submitButton).toBeDefined();
  });

  test("calls handler correctly", () => {
    userEvent.type(screen.getByPlaceholderText("title"), "test title");
    userEvent.type(screen.getByPlaceholderText("author"), "test author");
    userEvent.type(screen.getByPlaceholderText("url"), "test url");
    userEvent.click(submitButton)

    expect(mockAddBlog).toHaveBeenCalledWith({
      title: "test title",
      author: "test author",
      url: "test url"
    });
  });
});
