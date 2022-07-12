import React, { useEffect, useRef, useState } from 'react';
import { addBlogComment } from '../services/blogs';

function AddCommentModal({ display, setDisplay, setCount, blogId }) {
  const [loading, setLoading] = useState(false);
  const [body, setBody] = useState({
    name: '',
    email: '',
    comment: '',
  });
  const [errorMessages, setErrorMessages] = useState({});

  const modalRef = useRef(null);

  useEffect(() => {
    if (display[blogId]) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [display, blogId]);

  useEffect(() => {
    const handleClosingModal = (e) => {
      if (modalRef.current === e.target || e.key === 'Escape') {
        setErrorMessages({});
        setDisplay({ ...display, [blogId]: false });
      }
    };

    window.addEventListener('click', handleClosingModal);
    window.addEventListener('keyup', handleClosingModal);

    return () => {
      window.removeEventListener('click', handleClosingModal);
      window.removeEventListener('keyup', handleClosingModal);
    };

    // eslint-disable-next-line
  }, [setDisplay]);

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleErrorMessages = (field) => {
    if (field in errorMessages) return errorMessages[field];
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    addBlogComment(blogId, body)
      .then((data) => {
        if (data.message) {
          alert(data.message);
        }

        if (data.errorMessages) {
          setErrorMessages(data.errorMessages);
        } else {
          setErrorMessages({});
          setDisplay({ ...display, [blogId]: false });
          setCount((prevCount) => ({
            ...prevCount,
            [blogId]: prevCount[blogId] + 1,
          }));

          setBody({
            name: '',
            email: '',
            comment: '',
          });
        }

        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  return !display[blogId] ? null : (
    <div className="add-comment-modal modal" ref={modalRef}>
      <div className="modal-content" data-aos="fade-down">
        <div className="modal-header">
          <h2 className="modal-title">Add a comment</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={handleSubmit} className="add-comment-form">
            <div className="input-field name">
              <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Your Name"
                value={body.name}
              />
              {handleErrorMessages('name') !== null && (
                <small>{handleErrorMessages('name')}</small>
              )}
            </div>
            <div className="input-field email">
              <input
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="Your Email"
                value={body.email}
              />
              {handleErrorMessages('email') !== null && (
                <small>{handleErrorMessages('email')}</small>
              )}
            </div>
            <div className="input-field message">
              <textarea
                name="comment"
                rows="6"
                onChange={handleChange}
                placeholder="Your Comment"
                value={body.comment}
              ></textarea>
              {handleErrorMessages('comment') !== null && (
                <small>{handleErrorMessages('comment')}</small>
              )}
            </div>
            <button type="submit" disabled={loading}>
              Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCommentModal;
