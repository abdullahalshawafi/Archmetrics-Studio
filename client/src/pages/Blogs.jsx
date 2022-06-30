import React, { useEffect, useRef, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import ImagesGallery from '../components/ImagesGallery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import cover from '../assets/main_Background.jpg';
import { deleteBlog, getBlogs } from '../services/blogs';
import { useMainContext } from '../contexts/MainContext';
import '../App.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { setPathname } = useMainContext();

  useEffect(() => {
    setPathname('blogs');
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      if ('username' in decoded) {
        setIsAuthorized(true);
      }
    }

    setLoading(true);
    getBlogs(setBlogs)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, []);

  return (
    <ClientLayout>
      <Helmet>
        <title>Archmetrics | Blogs</title>
      </Helmet>
      <div
        className="slider-container cover-details"
        style={{ backgroundImage: `url(${cover})` }}
      >
        <div style={{ paddingTop: '67px' }}>
          <h1>Check out our blogs!</h1>
        </div>
      </div>
      <div className="blogs">
        {loading ? (
          <h1>Loading...</h1>
        ) : blogs.length === 0 ? (
          <h1>There are no blogs at the moment :(</h1>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog" id={blog._id.toString()}>
              <div className="blog-header">
                <div className="d-flex flex-column">
                  <h4 className="blog-author">{blog.author}</h4>
                  <small className="text-muted">
                    {moment(blog.updatedAt).format('h:m A | Do MMM YYYY')}{' '}
                    {blog.createdAt !== blog.updatedAt ? '(Edited)' : ''}
                  </small>
                </div>
                {!isAuthorized ? null : (
                  <DropDownMenu blogs={blogs} setBlogs={setBlogs} blog={blog} />
                )}
              </div>
              <p className="blog-content">{blog.content}</p>
              {!!blog.images.length && (
                <div className="blog-gallery">
                  <ImagesGallery
                    showThumbnails={false}
                    disableKeyDown={true}
                    data={blog.images}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </ClientLayout>
  );
}

function DropDownMenu({ blogs, setBlogs, blog }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownMenu = useRef(null);

  useEffect(() => {
    const windowClickHandler = (e) => {
      if (!dropdownMenu.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('click', windowClickHandler);

    return () => {
      window.removeEventListener('click', windowClickHandler);
    };
  }, []);

  const handleEditButtonClick = (blogId) => {
    window.location.href = `/admin/edit-blog/${blogId}`;
  };

  const handleDeleteButtonClick = (blogId) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(blogs, blogId, setBlogs);
    }
  };

  return (
    <div className="options-menu" ref={dropdownMenu}>
      <span
        className="options-button"
        onClick={() => {
          setShowDropdown(true);
        }}
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </span>
      {!showDropdown ? null : (
        <div className="options-dropdown">
          <div
            className="dropdown-item text-warning"
            onClick={() => handleEditButtonClick(blog._id)}
          >
            <span>Edit</span>
            <span>
              <FontAwesomeIcon icon={faPen} />
            </span>
          </div>
          <div
            className="dropdown-item text-danger"
            onClick={() => handleDeleteButtonClick(blog._id)}
          >
            <span>Delete</span>
            <span>
              <FontAwesomeIcon icon={faTrash} />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
