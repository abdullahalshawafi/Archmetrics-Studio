import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import GalleryUpload from '../../components/admin/GalleryUpload';
import AdminLayout from '../../layouts/AdminLayout';
import { loggedIn } from '../../services/auth';
import { createBlog, editBlog, getSingleBlog } from '../../services/blogs';
import { useMainContext } from '../../contexts/MainContext';

function AdminService() {
  const { setAdminPage } = useMainContext();
  const { blogId } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [body, setBody] = useState({
    author: '',
    content: '',
    images: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    !blogId && setAdminPage('blogs');
  });

  useEffect(() => {
    if (blogId) {
      getSingleBlog(blogId, setBody, setRedirect);
    } else {
      setBody({
        author: '',
        content: '',
        images: [],
      });
    }
  }, [blogId]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to="/blogs" />;
  }

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let status = 0;
    if (!blogId) {
      status = await createBlog(body);
    } else {
      status = await editBlog(blogId, body);
    }
    setLoading(false);
    if (status === 200) {
      if (!blogId) {
        setBody({
          author: '',
          content: '',
          images: [],
        });
        alert('Blog created successfully!');
        window.location.reload();
      } else {
        alert('Blog modified successfully!');
        setRedirect(true);
      }
    } else {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Archmetrics | {blogId ? 'Edit' : 'Add'} Blog</title>
      </Helmet>
      <div className="pt-5 m-5">
        <h2 className="page-title">{blogId ? 'Edit' : 'Add'} a blog</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="author">Author</label>
            <input
              className="form-control"
              type="text"
              name="author"
              id="author"
              placeholder="Blog author"
              autoComplete="off"
              onChange={handleChange}
              value={body.author}
              autoFocus
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="content">Content</label>
            <textarea
              className="form-control"
              name="content"
              id="content"
              cols="30"
              rows="10"
              placeholder="Blog content"
              onChange={handleChange}
              value={body.content}
              required
            ></textarea>
          </div>
          <div className="form-group my-3">
            <label>Gallery</label>
            <GalleryUpload
              setLoading={setLoadingGallery}
              setBody={setBody}
              body={body}
            />
          </div>
          <button
            className="btn btn-warning"
            disabled={loading || loadingGallery}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
            className="btn btn-secondary ms-3"
          >
            Cancel
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminService;
