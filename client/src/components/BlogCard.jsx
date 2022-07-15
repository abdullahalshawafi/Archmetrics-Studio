import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ImagesGallery from '../components/ImagesGallery';
import AddCommentModal from '../components/AddCommentModal';
import CommentsModal from '../components/CommentsModal';
import ShareModal from '../components/ShareModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faExternalLinkSquareAlt,
  faPen,
  faShare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { faCommentAlt, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { useMainContext } from '../contexts/MainContext';
import { blogLike, blogUnlike, deleteBlog } from '../services/blogs';
import '../App.css';

export default function BlogCard({
  blog,
  isSingleBlog,
  handleDeleteBlog,
  displayShare,
  setDisplayShares,
  displayComment,
  setDisplayComments,
  displayCommentForm,
  setDisplayCommentForms,
  isAuthorized,
  likesCount,
  setLikesCounts,
  commentsCount,
  setCommentsCounts,
}) {
  const handleLikeBtnClick = (blogId) => {
    if (localStorage.getItem(`${blogId}`) === 'liked') {
      blogUnlike(blogId)
        .then(() => {
          setLikesCounts((prev) => ({ ...prev, [blogId]: prev[blogId] - 1 }));
          localStorage.removeItem(`${blogId}`);
          document
            .querySelector(`.blog-${blogId} .like-btn`)
            .classList.remove('liked');
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      blogLike(blogId)
        .then(() => {
          setLikesCounts((prev) => ({ ...prev, [blogId]: prev[blogId] + 1 }));
          localStorage.setItem(`${blogId}`, 'liked');
          document
            .querySelector(`.blog-${blogId} .like-btn`)
            .classList.add('liked');
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  const handleOpenModal = (setState, blogId) => {
    setState((prev) => ({ ...prev, [blogId]: true }));
  };

  return (
    <div className={`blog blog-${blog._id}`} data-aos="fade-up" data-aos-duration="1000">
      <div className="blog-header">
        <div className="d-flex flex-column">
          <h5 className="blog-author">{blog.author}</h5>
          <small className="text-muted">
            {moment(blog.updatedAt).format('h:mm A | Do MMM YYYY')}{' '}
            {blog.createdAt !== blog.updatedAt ? '(Edited)' : ''}
          </small>
        </div>
        {isSingleBlog && !isAuthorized ? null : (
          <DropDownMenu
            isAuthorized={isAuthorized}
            handleDeleteBlog={handleDeleteBlog}
            blog={blog}
          />
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
        <span className="text-muted likes-count">{likesCount} Likes</span>
        <span
          className="text-muted comments-count"
          onClick={() => handleOpenModal(setDisplayComments, blog._id)}
        >
          {commentsCount} Comments
        </span>
      </div>
      <hr />
      <div className="interactions">
        <span
          className={`interaction-btn like-btn ${blog.liked ? 'liked' : ''}`}
          onClick={() => handleLikeBtnClick(blog._id)}
        >
          <FontAwesomeIcon icon={faThumbsUp} />
          &nbsp; Like
        </span>
        <span
          className="interaction-btn"
          onClick={() => handleOpenModal(setDisplayCommentForms, blog._id)}
        >
          <FontAwesomeIcon icon={faCommentAlt} />
          &nbsp; Comments
        </span>
        <span
          className="interaction-btn"
          onClick={() => handleOpenModal(setDisplayShares, blog._id)}
        >
          <FontAwesomeIcon icon={faShare} />
          &nbsp; Share
        </span>
      </div>
      <AddCommentModal
        display={displayCommentForm}
        setDisplay={setDisplayCommentForms}
        setCount={setCommentsCounts}
        blogId={blog._id}
      />
      <CommentsModal
        display={displayComment}
        setDisplay={setDisplayComments}
        blogId={blog._id}
      />
      <ShareModal
        display={displayShare}
        setDisplay={setDisplayShares}
        blogId={blog._id}
      />
    </div>
  );
}

function DropDownMenu({ isAuthorized, blog, handleDeleteBlog }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const { pathname } = useMainContext();

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
      deleteBlog(blogId)
        .then(() => {
          handleDeleteBlog(blogId);
        })
        .catch((err) => {
          console.log(err);
        });
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
          {pathname !== 'single-blog' ? (
            <Link
              to={`/blogs/${blog._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="dropdown-item text-white"
            >
              <span>Open</span>
              <span>
                <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
              </span>
            </Link>
          ) : null}
          {!isAuthorized ? null : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}
