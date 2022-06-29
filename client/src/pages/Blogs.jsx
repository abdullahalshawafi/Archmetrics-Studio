import React, { useEffect, useState } from 'react';
import ClientLayout from '../layouts/ClientLayout';
import { Helmet } from 'react-helmet';
import ImagesGallery from '../components/ImagesGallery';
import cover from '../assets/main_Background.jpg';
import { getBlogs } from '../services/blogs';
import { useMainContext } from '../contexts/MainContext';
import '../App.css';

export default function Services() {
  const [blogs, setBlogs] = useState([]);
  const { setPathname } = useMainContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    setPathname('blogs');
  });

  useEffect(() => {
    getBlogs(setBlogs);
  }, []);

  return (
    <ClientLayout>
      <Helmet>
        <title>Archmetrics | Services</title>
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
        {blogs.length === 0 ? (
          <h1>There are no blogs at the moment :(</h1>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog">
              <h4>{blog.author}</h4>
              <p>{blog.content}</p>
              {!!blog.images.length && (
                <ImagesGallery showThumbnails={false} data={blog.images} />
              )}
            </div>
          ))
        )}
      </div>
    </ClientLayout>
  );
}
