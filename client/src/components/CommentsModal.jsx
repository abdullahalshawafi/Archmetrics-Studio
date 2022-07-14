import React, { useEffect, useRef, useState } from 'react';
import { getSingleBlogComments } from '../services/blogs';

function CommentsModal({ display, setDisplay, blogId }) {
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const commentsModalRef = useRef(null);

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
      getSingleBlogComments(blogId, setComments, setLoading);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [display, blogId]);

  useEffect(() => {
    const handleClosingModal = (e) => {
      if (commentsModalRef.current === e.target || e.key === 'Escape') {
        setDisplay((prev) => ({ ...prev, [blogId]: false }));
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

  return !display ? null : loading ? (
    <h3>Loading comments...</h3>
  ) : (
    <div className="comments-modal modal" ref={commentsModalRef}>
      <div className="modal-content" data-aos="fade-down">
        <div className="modal-header">
          <h2 className="modal-title">Comments</h2>
        </div>
        <div className="modal-body">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className="comment-container">
                <p className="comment">{comment.comment}</p>
                <small className="d-block text-muted">{comment.name}</small>
                <small className="d-block text-muted">
                  <i>{comment.date}</i>
                </small>
              </div>
            ))
          ) : (
            <h5 className="text-center font-weight-bold">No comments yet</h5>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentsModal;
