import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

const blog = {
  id: "5f7b6b3b1c9d440000b0d1a1",
  title: "Component testing is done with react-testing-library",
  author: "Test Author",
  url: "http://localhost:3000",
  user: {
    id: "5f7b6b3b1c9d440000b0d1a0",
    username: "testuser",
    name: "Test User",
  },
  likes: 14,
};

mockLikeBlog = jest.fn();
mockDeleteBlog = jest.fn();

let renderedBlog;

beforeAll(() => {
  renderedBlog = render(
    <Blog blog={blog} likeBlog={mockLikeBlog} deleteBlog={mockDeleteBlog} />
  );
});

test("renders content", () => {
  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );

  expect(element).toBeDefined();
});
