import React, { useEffect, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import BlogCard from '../components/BlogCard';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import cover from '../assets/main_Background.jpg';
import { getBlogs } from '../services/blogs';
import { useMainContext } from '../contexts/MainContext';
import '../App.css';

export default function Blogs() {
  const [blogs, setBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [likesCounts, setLikesCounts] = useState({});
  const [commentsCounts, setCommentsCounts] = useState({});
  const [displayShares, setDisplayShares] = useState({});
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

      setLikesCounts(
        Object.values(blogs).reduce((acc, blog) => {
          acc[blog._id] = blog.likes;
          return acc;
        }, {}),
      );

      setCommentsCounts(
        Object.values(blogs).reduce((acc, blog) => {
          acc[blog._id] = blog.comments.length;
          return acc;
        }, {}),
      );

      setDisplayShares(displays);
      setDisplayComments(displays);
      setDisplayCommentForms(displays);
    }
  }, [blogs]);

  const handlePageScroll = () => {
    document.querySelector('.blogs').scrollIntoView();
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs((prevBlogs) => {
      delete prevBlogs[blogId];
      return { ...prevBlogs };
    });
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
            <BlogCard
              key={blog._id}
              blog={blog}
              handleDeleteBlog={handleDeleteBlog}
              displayShare={displayShares[blog._id]}
              setDisplayShares={setDisplayShares}
              displayComment={displayComments[blog._id]}
              setDisplayComments={setDisplayComments}
              displayCommentForm={displayCommentForms[blog._id]}
              setDisplayCommentForms={setDisplayCommentForms}
              isAuthorized={isAuthorized}
              likesCount={likesCounts[blog._id]}
              setLikesCounts={setLikesCounts}
              commentsCount={commentsCounts[blog._id]}
              setCommentsCounts={setCommentsCounts}
            />
          ))
        )}
      </div>
    </ClientLayout>
  );
}
