import axios from 'axios';

export const getBlogs = async (setter) => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/blog`);
    const blogs = res.data.blogs
      .map((blog) => {
        if (localStorage.getItem(`${blog._id}`) === 'liked') {
          return { ...blog, liked: true };
        }
        return { ...blog, liked: false };
      })
      .reduce((acc, blog) => {
        acc[blog._id] = blog;
        return acc;
      }, {});
    setter(blogs);
  } catch (err) {
    throw err;
  }
};

export const getSingleBlog = async (blogId, setter) => {
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
    const { blog } = res.data;
    blog.liked = localStorage.getItem(`${blog._id}`) === 'liked';
    setter(blog);
  } catch (err) {
    throw err;
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
    const now = new Date();
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/blog/create`,
      { ...body, createdAt: now, updatedAt: now },
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
    const now = new Date();
    const res = await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/edit/${blogId}`,
      { ...body, updatedAt: now },
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

export const deleteBlog = async (blogId) => {
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
      alert(res.data.message);
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
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/like`,
      {},
    );
  } catch (err) {
    throw err;
  }
};

export const blogUnlike = async (blogId) => {
  try {
    await axios.put(
      `${process.env.REACT_APP_BASE_URL}/blog/${blogId}/unlike`,
      {},
    );
  } catch (err) {
    throw err;
  }
};
