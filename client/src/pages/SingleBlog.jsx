import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ClientLayout from '../layouts/ClientLayout';
import BlogCard from '../components/BlogCard';
import { useMainContext } from '../contexts/MainContext';
import { Helmet } from 'react-helmet';
import jwtDecode from 'jwt-decode';
import { getSingleBlog } from '../services/blogs';
import '../App.css';

export default function SingleBlog() {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [likesCounts, setLikesCounts] = useState({});
  const [commentsCounts, setCommentsCounts] = useState({});
  const [displayShares, setDisplayShares] = useState({});
  const [displayComments, setDisplayComments] = useState({});
  const [displayCommentForms, setDisplayCommentForms] = useState({});

  const { blogId } = useParams();

  const { setPathname } = useMainContext();

  useEffect(() => {
    setPathname('single-blog');
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
    getSingleBlog(blogId, setBlog)
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  }, [blogId]);

  useEffect(() => {
    if (blog) {
      setLikesCounts({ [blogId]: blog.likes });
      setCommentsCounts({ [blogId]: blog.comments.length });
      setDisplayShares({ [blogId]: false });
      setDisplayComments({ [blogId]: false });
      setDisplayCommentForms({ [blogId]: false });
    }
  }, [blogId, blog]);

  const handleDeleteBlog = () => {
    window.location.href = '/blogs';
  };

  return (
    <ClientLayout>
      <Helmet>
        <title>Archmetrics</title>
      </Helmet>
      <div className="blogs" style={{ marginTop: '7rem' }}>
        {loading ? (
          <h2 className="text-center">Loading...</h2>
        ) : !blog ? (
          <h2 className="text-center">
            The blog that you are looking for is not found :(
          </h2>
        ) : (
          <BlogCard
            key={blog._id}
            IsSingleBlog={true}
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
        )}
      </div>
    </ClientLayout>
  );
}
