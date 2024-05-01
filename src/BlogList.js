import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setBlogs(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id));
      })
      .catch(error => {
        console.error('Error deleting blog post: ', error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/posts', {
      title,
      body,
      userId: 1 // Hardcoded userId for simplicity
    })
      .then(response => {
        setBlogs([...blogs, response.data]);
        setTitle('');
        setBody('');
      })
      .catch(error => {
        console.error('Error adding blog post: ', error);
      });
  };

  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>
            {blog.title}<br/>{blog.body}
            <br/><br/>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
            <hr/>
          </li>
        ))}
      </ul>
      <h2>Add a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Body:
          <textarea value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Blog Post</button>
      </form>
    </div>
  );
};

export default BlogList;