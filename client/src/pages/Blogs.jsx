import React, { useEffect, useRef, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import ImagesGallery from '../components/ImagesGallery';
import AddCommentModal from '../components/AddCommentModal';
import CommentsModal from '../components/CommentsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faEllipsisH,
  faPen,
  faShare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import cover from '../assets/main_Background.jpg';
import { blogLike, blogUnlike, deleteBlog, getBlogs } from '../services/blogs';
import { useMainContext } from '../contexts/MainContext';
import '../App.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [commentsCounts, setCommentsCounts] = useState({});
  const [displayComments, setDisplayComments] = useState({});
  const [displayCommentForms, setDisplayCommentForms] = useState({});
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

  useEffect(() => {
    if (Object.values(blogs).length > 0) {
      const displays = Object.values(blogs).reduce((acc, blog) => {
        acc[blog._id] = false;
        return acc;
      }, {});

      setCommentsCounts(
        Object.values(blogs).reduce((acc, blog) => {
          acc[blog._id] = blog.comments.length;
          return acc;
        }, {}),
      );

      setDisplayComments(displays);
      setDisplayCommentForms(displays);
    }
  }, [blogs]);

  const handlePageScroll = () => {
    document.querySelector('.blogs').scrollIntoView();
  };

  const handleLikeBtnClick = (blogId) => {
    if (localStorage.getItem(`${blogId}`) === 'liked') {
      blogUnlike(blogId)
        .then((data) => {
          setBlogs({ ...blogs, [blogId]: data.blog });
          localStorage.removeItem(`${blogId}`);
          document
            .querySelector(`#blog-${blogId} .like-btn`)
            .classList.remove('liked');
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      blogLike(blogId)
        .then((data) => {
          setBlogs({ ...blogs, [blogId]: data.blog });
          localStorage.setItem(`${blogId}`, 'liked');
          document
            .querySelector(`#blog-${blogId} .like-btn`)
            .classList.add('liked');
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

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
        <div className="scroll-down-arrow" onClick={handlePageScroll}>
          <FontAwesomeIcon icon={faAngleDown} size="2x" />
        </div>
      </div>
      <div className="blogs">
        {loading ? (
          <h2 className="text-center">Loading...</h2>
        ) : Object.values(blogs).length === 0 ? (
          <h2 className="text-center">There are no blogs at the moment :(</h2>
        ) : (
          Object.values(blogs).map((blog) => (
            <div
              key={blog._id}
              className="blog"
              id={`blog-${blog._id}`}
              data-aos="fade-up"
              data-aos-duration="1000"
            >
              <div className="blog-header">
                <div className="d-flex flex-column">
                  <h5 className="blog-author">{blog.author}</h5>
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
              <div className="blog-stats">
                <span className="text-muted likes-count">
                  {blog.likes} Likes
                </span>
                <span
                  className="text-muted comments-count"
                  onClick={() => {
                    setDisplayComments({
                      ...displayComments,
                      [blog._id]: true,
                    });
                  }}
                >
                  {commentsCounts[blog._id]} Comments
                </span>
              </div>
              <hr />
              <div className="interactions">
                <span
                  className={`interaction-btn like-btn ${
                    blog.liked ? 'liked' : ''
                  }`}
                  onClick={() => handleLikeBtnClick(blog._id)}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  &nbsp; Like
                </span>
                <span
                  className="interaction-btn"
                  onClick={() =>
                    setDisplayCommentForms({
                      ...displayCommentForms,
                      [blog._id]: true,
                    })
                  }
                >
                  <FontAwesomeIcon icon={faCommentAlt} />
                  &nbsp; Comments
                </span>
                <span className="interaction-btn">
                  <FontAwesomeIcon icon={faShare} />
                  &nbsp; Share
                </span>
              </div>
              <AddCommentModal
                display={displayCommentForms}
                setDisplay={setDisplayCommentForms}
                setCount={setCommentsCounts}
                blogId={blog._id}
              />
              <CommentsModal
                display={displayComments}
                setDisplay={setDisplayComments}
                blogId={blog._id}
                comments={blog.comments}
              />
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
