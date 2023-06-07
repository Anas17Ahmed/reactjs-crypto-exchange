import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Blogs from '../Components/Blogs';

const waitFor = (fn, delay) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (fn) {
        const returnedVal = fn();
        if (returnedVal && returnedVal instanceof Promise) 
          returnedVal.then(() => res());
        else
          res();
      } else {
        res();
      }
    }, 500);
  });
} 

describe('Blogs', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should be able to renders component without crashing', async () => {
    render(<Blogs />);

    await waitFor(null, 500);
    const blogsElement = screen.getByText('Blogs');
    expect(blogsElement).toBeInTheDocument();
  });

  it('should display the correct number of blogs', async () => {
    const blogs = [
      { id: 1, title: 'Blog 1', subtitle: 'Subtitle 1', author: 'Author 1' },
      { id: 2, title: 'Blog 2', subtitle: 'Subtitle 2', author: 'Author 2' },
      { id: 3, title: 'Blog 3', subtitle: 'Subtitle 3', author: 'Author 3' },
    ];
    localStorage.setItem('blogs', JSON.stringify(blogs));

    render(<Blogs />);

    await waitFor(null, 500);
    const blogRows = screen.getAllByRole('row');
    expect(blogRows).toHaveLength(blogs.length + 1); // Including the table header row
  });

  it('adds a new blog on save', async () => {
    render(<Blogs />);

    await waitFor(null, 500);

    const newBlog = {
      title: 'New Blog',
      subtitle: 'New Subtitle',
      author: 'New Author',
    };

    fireEvent.click(screen.getByText('+ Add'));

    await waitFor(null, 500);
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: newBlog.title } });
    fireEvent.change(screen.getByLabelText('Subtitle'), { target: { value: newBlog.subtitle } });
    fireEvent.change(screen.getByLabelText('Author'), { target: { value: newBlog.author } });

    fireEvent.click(screen.getByText('Save'));
    await waitFor(null, 500);

    const updatedBlogs = JSON.parse(localStorage.getItem('blogs'));

    expect(updatedBlogs).toContainEqual(expect.objectContaining(newBlog));
  });

  it('deletes a blog', async () => {
    const blogs = [
      { id: 1, title: 'Blog 1', subtitle: 'Subtitle 1', author: 'Author 1' },
      { id: 2, title: 'Blog 2', subtitle: 'Subtitle 2', author: 'Author 2' },
      { id: 3, title: 'Blog 3', subtitle: 'Subtitle 3', author: 'Author 3' },
    ];
    localStorage.setItem('blogs', JSON.stringify(blogs));

    render(<Blogs />);
    await waitFor(null, 500);

    const deleteButton = screen.getByTestId(`delete-button-${blogs[0].id}`);
    fireEvent.click(deleteButton);
    await waitFor(null, 500);

    const updatedBlogs = JSON.parse(localStorage.getItem('blogs'));

    expect(updatedBlogs).not.toContainEqual(expect.objectContaining(blogs[0]));
  });
});
