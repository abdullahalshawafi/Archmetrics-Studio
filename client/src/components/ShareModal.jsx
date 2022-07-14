import React, { useEffect, useRef } from 'react';
import { ShareSocial } from 'react-share-social';

const style = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
};

function ShareModal({ display, setDisplay, blogId }) {
  const shareModalRef = useRef(null);

  useEffect(() => {
    if (display) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [display]);

  useEffect(() => {
    const handleClosingModal = (e) => {
      if (shareModalRef.current === e.target || e.key === 'Escape') {
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

  return !display ? null : (
    <div className="shares-modal modal" ref={shareModalRef}>
      <div className="modal-content" data-aos="fade-down">
        <div className="modal-header">
          <h2 className="modal-title">Share to social media</h2>
        </div>
        <div className="modal-body">
          <ShareSocial
            style={style}
            url={`${window.location.origin}/blogs/${blogId}`}
            socialTypes={['facebook', 'twitter', 'linkedin']}
          />
        </div>
      </div>
    </div>
  );
}

export default ShareModal;
