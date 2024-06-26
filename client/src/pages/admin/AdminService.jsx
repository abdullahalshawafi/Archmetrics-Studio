import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, Navigate, useParams } from 'react-router-dom';
import GalleryUpload from '../../components/admin/GalleryUpload';
import AdminLayout from '../../layouts/AdminLayout';
import { uploadImage } from '../../services';
import { loggedIn } from '../../services/auth';
import {
  createService,
  editService,
  getSingleService,
} from '../../services/services';
import { useMainContext } from '../../contexts/MainContext';

function AdminService() {
  const { setAdminPage } = useMainContext();
  const { service } = useParams();
  const [summaryCount, setSummaryCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [body, setBody] = useState({
    title: '',
    summary: '',
    description: '',
    cover: '',
    images: [],
  });

  const summaryField = useRef(null);
  const defaultText = useRef(null);
  const imagePreview = useRef(null);

  const summaryLimit = 100;

  useEffect(() => {
    !service && setAdminPage('services');
  });

  useEffect(() => {
    if (service) {
      getSingleService(service, setBody, setRedirect);
    } else {
      setBody({
        title: '',
        summary: '',
        description: '',
        cover: '',
        images: [],
      });
    }
  }, [service]);

  useEffect(() => {
    service && body.cover.includes('https://') && showImagePreview(body.cover);
    service && setSummaryCount(body.summary.length);
  }, [service, body]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to="/admin/dashboard" />;
  }

  const showImagePreview = (imgSrc) => {
    defaultText.current.setAttribute('style', 'display: none;');
    imagePreview.current.setAttribute('src', imgSrc);
    imagePreview.current.setAttribute(
      'style',
      'display: block; max-width: 100%; height: auto;',
    );
  };

  const removeImagePreview = () => {
    defaultText.current.setAttribute('style', 'display: block;');
    imagePreview.current.setAttribute('src', '#');
    imagePreview.current.setAttribute('style', 'display: none;');
  };

  const readURL = (input) => {
    if (input.target.files.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setLoading(true);
        setBody({ ...body, cover: await uploadImage(input.target.files[0]) });
        showImagePreview(e.target.result);
        setLoading(false);
      };
      reader.readAsDataURL(input.target.files[0]);
    } else {
      removeImagePreview();
    }
  };

  const handleChange = (e) => {
    const count = summaryField.current.value.length;
    if (e.target.name === 'summary' && count <= summaryLimit) {
      setBody({ ...body, [e.target.name]: e.target.value });
      setSummaryCount(count);
    } else if (e.target.name !== 'summary') {
      setBody({ ...body, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let status = 0;
    if (!service) {
      status = await createService(body);
    } else {
      status = await editService(service, body);
    }
    setLoading(false);
    if (status === 200) {
      if (!service) {
        removeImagePreview();
        setBody({
          title: '',
          summary: '',
          description: '',
          cover: '',
          images: [],
        });
        alert('Service created successfully!');
        window.location.reload();
      } else {
        alert('Service modified successfully!');
        setRedirect(true);
      }
    } else {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Archmetrics | {service ? 'Edit' : 'Add'} Service</title>
      </Helmet>
      <div className="pt-5 m-5">
        <h2 className="page-title">{service ? 'Edit' : 'Add'} a service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              id="title"
              placeholder="Service title"
              autoComplete="off"
              onChange={handleChange}
              value={body.title}
              autoFocus
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="summary">Summary</label>
            <textarea
              className="form-control"
              name="summary"
              id="summary"
              cols="30"
              rows="10"
              placeholder="Service summary"
              ref={summaryField}
              onChange={handleChange}
              value={body.summary}
              required
            ></textarea>
            <div className="mt-1">
              {summaryCount}/{summaryLimit}
            </div>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              name="description"
              id="description"
              cols="30"
              rows="10"
              placeholder="Service description"
              onChange={handleChange}
              value={body.description}
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cover">Cover Image</label>
            <input
              className="form-control"
              type="file"
              name="cover"
              id="cover"
              title=""
              onChange={readURL}
              style={{ height: 'fit-content' }}
            />
            <div className="bg-secondary">
              <div className="d-flex justify-content-center w-50 mx-auto my-3 py-3">
                <img
                  src="#"
                  alt="preview"
                  ref={imagePreview}
                  style={{ display: 'none' }}
                />
                <span
                  ref={defaultText}
                  className="text-light text-center"
                  style={{ display: 'block' }}
                >
                  Image Preview
                </span>
              </div>
            </div>
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
          <Link to="/admin/dashboard" className="btn btn-secondary ms-3">
            Cancel
          </Link>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminService;
