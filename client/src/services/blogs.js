import axios from 'axios';

export const getBlogs = async (setter) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog`);
    setter(res.data.blogs);
  } catch (err) {
    throw err;
  }
};

export const getSingleBlog = async (blogId, setter, error) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          [process.env.REACT_APP_HEADER]: localStorage.getItem('token'),
        },
      },
    );
    setter(res.data.blog);
  } catch (err) {
    console.log(err.message);
    error(true);
  }
};

export const getSingleBlogComments = async (blogId, setter, error) => {
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/comments`,
    );
    setter(res.data.comments);
  } catch (err) {
    console.log(err.message);
    error(true);
  }
};

export const createBlog = async (body) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/blog/create`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          [process.env.REACT_APP_HEADER]: localStorage.getItem('token'),
        },
      },
    );

    return res.status;
  } catch (err) {
    throw err;
  }
};

export const editBlog = async (blogId, body) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/edit/${blogId}`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
          [process.env.REACT_APP_HEADER]: localStorage.getItem('token'),
        },
      },
    );

    return res.status;
  } catch (err) {
    throw err;
  }
};

export const deleteBlog = async (blogs, blogId, setter) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/blog/delete/${blogId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          [process.env.REACT_APP_HEADER]: localStorage.getItem('token'),
        },
      },
    );
    if (res.status === 200) {
      blogs = blogs.filter((x) => x._id !== blogId);
      setter(blogs);
    }
  } catch (err) {
    throw err;
  }
};

export const addBlogComment = async (blogId, body) => {
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/add-comment`,
      body,
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const blogLike = async (blogId) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/like`,
      {},
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

export const blogUnlike = async (blogId) => {
  try {
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/unlike`,
      {},
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};
