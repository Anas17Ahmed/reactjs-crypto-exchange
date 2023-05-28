import React, { useState, useEffect } from 'react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    subtitle: '',
    author: '',
  });

  useEffect(() => {
    // Retrieve blogs from local storage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs'));
    if (storedBlogs) {
      setBlogs(storedBlogs);
    }
  }, []);

  useEffect(() => {
    // Update local storage when blogs state changes
    localStorage.setItem('blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleAddBlog = () => {
    const newId = blogs.length > 0 ? blogs[blogs.length - 1].id + 1 : 1;
    const newBlogWithId = { ...newBlog, id: newId };
    setBlogs((prevBlogs) => [...prevBlogs, newBlogWithId]);
    setNewBlog({
      title: '',
      subtitle: '',
      author: '',
    });
    setModalOpen(false);
  };

  const handleViewBlog = (blogId) => {
    // Handle view action
    console.log(`View blog with ID: ${blogId}`);
  };

  const handleEditBlog = (blogId) => {
    // Handle edit action
    console.log(`Edit blog with ID: ${blogId}`);
  };

  const handleDeleteBlog = (blogId) => {
    // Handle delete action
    console.log(`Delete blog with ID: ${blogId}`);
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
  };

  return (
    <div className='container'>
      <h2 className='m-3 text-center'>Blogs</h2>
      <button className="btn btn-primary mb-3" onClick={() => setModalOpen(true)}>+ Add</button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Subtitle</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.subtitle}</td>
              <td>{blog.author}</td>
              <td>
                <button className="btn btn-sm btn-info mr-1" onClick={() => handleViewBlog(blog.id)}>View</button>
                <button className="btn btn-sm btn-primary mr-1" onClick={() => handleEditBlog(blog.id)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={`modal ${modalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: modalOpen ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Blog</h5>
              <button type="button" className="close" onClick={() => setModalOpen(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={newBlog.title} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Subtitle</label>
                <input type="text" className="form-control" name="subtitle" value={newBlog.subtitle} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input type="text" className="form-control" name="author" value={newBlog.author} onChange={handleInputChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" onClick={handleAddBlog}>Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;