import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, Navigate, useParams } from "react-router-dom";
import GalleryUpload from "../../components/admin/GalleryUpload";
import AdminLayout from "../../layouts/AdminLayout";
import { uploadImage } from "../../services";
import { loggedIn } from "../../services/auth";
import {
  createProject,
  editProject,
  getSingleProject,
} from "../../services/projects";
import { getServices } from "../../services/services";
import { useAuthContext } from "../../helpers/AuthContext";

function AdminService() {
  const { setAdminPage } = useAuthContext();
  const { project } = useParams();
  const [loading, setLoading] = useState(false);
  const [loadingGallery, setLoadingGallery] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [services, setServices] = useState([]);
  const [checkedServices, setCheckedServices] = useState([]);
  const [body, setBody] = useState({
    title: "",
    year: "",
    area: "",
    location: "",
    client: "",
    type: "",
    stage: "",
    isTop: false,
    description: "",
    services: [],
    cover: "",
    images: [],
  });

  const imagePreview = useRef(null);
  const defaultText = useRef(null);

  const showImagePreview = (imgSrc) => {
    defaultText.current.setAttribute("style", "display: none;");
    imagePreview.current.setAttribute("src", imgSrc);
    imagePreview.current.setAttribute(
      "style",
      "display: block; max-width: 100%; height: auto;"
    );
  };

  const removeImagePreview = () => {
    defaultText.current.setAttribute("style", "display: block;");
    imagePreview.current.setAttribute("src", "#");
    imagePreview.current.setAttribute("style", "display: none;");
  };

  useEffect(() => {
    !project && setAdminPage("projects");
  });

  useEffect(() => {
    getServices(setServices);
  }, []);

  useEffect(() => {
    if (project) {
      getSingleProject(project, setBody, setRedirect);
    } else {
      removeImagePreview();
      setCheckedServices([]);
      setBody({
        title: "",
        year: "",
        area: "",
        location: "",
        client: "",
        type: "",
        stage: "",
        isTop: false,
        description: "",
        services: [],
        cover: "",
        images: [],
      });
    }
  }, [project]);

  useEffect(() => {
    project && body.cover.includes("https://") && showImagePreview(body.cover);
  }, [project, body.cover]);

  useEffect(() => {
    if (project && services) {
      const bodyServices = body.services.map((service) => service.slug);
      const temp = new Array(services.length).fill(false);
      services.forEach((service, index) => {
        if (bodyServices.includes(service.slug)) {
          temp[index] = true;
        }
      });
      setCheckedServices(temp);
    }
  }, [project, body, services]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to="/admin/dashboard" />;
  }

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
    if (e.target.name === "isTop") {
      setBody({ ...body, [e.target.name]: e.target.checked });
    } else {
      setBody({ ...body, [e.target.name]: e.target.value });
    }
  };

  const handleCheckboxChange = (position) => {
    const updatedCheckedServices = checkedServices.map((service, index) =>
      index === position ? !service : service
    );

    setCheckedServices(updatedCheckedServices);

    const temp = [];
    updatedCheckedServices.forEach((service, index) => {
      if (service) {
        temp.push(services[index].slug);
      }
    });

    setBody({ ...body, services: temp });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    let status = 0;
    if (!project) {
      status = await createProject(body);
    } else {
      status = await editProject(project, body);
    }
    setLoading(false);
    if (status === 200) {
      if (!project) {
        removeImagePreview();
        setCheckedServices(new Array(services.length).fill(false));
        setBody({
          title: "",
          year: "",
          area: "",
          location: "",
          client: "",
          isTop: false,
          description: "",
          type: "",
          stages: "",
          cover: "",
          services: [],
          images: [],
        });
        alert("Project created successfully!");
        window.location.reload();
      } else {
        alert("Project modified successfully!");
        setRedirect(true);
      }
    } else {
      alert("An error occurred. Please try again.");
      window.location.reload();
    }
  };

  return (
    <AdminLayout>
      <Helmet>
        <title>Archmetrics | {project ? "Edit" : "Add"} Project</title>
      </Helmet>
      <div className="pt-5 m-5">
        <h2 className="page-title">{project ? "Edit" : "Add"} a project</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row align-items-end">
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="title">Title</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                placeholder="Project title"
                autoComplete="off"
                onChange={handleChange}
                value={body.title}
                autoFocus
              />
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <input
                className="form-check-input mb-3 me-2"
                type="checkbox"
                name="isTop"
                id="isTop"
                placeholder="Project isTop"
                onChange={handleChange}
                checked={body.isTop}
              />
              <label htmlFor="isTop" className="form-check-label">
                Top Project
              </label>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="client">Client</label>
              <input
                className="form-control"
                type="text"
                name="client"
                id="client"
                placeholder="Project client"
                autoComplete="off"
                onChange={handleChange}
                value={body.client}
              />
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="area">Area</label>
              <input
                className="form-control"
                type="text"
                name="area"
                id="area"
                placeholder="Project area"
                autoComplete="off"
                onChange={handleChange}
                value={body.area}
              />
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="type">Type</label>
              <select
                className="form-select"
                name="type"
                id="type"
                onChange={handleChange}
                value={body.type}
                required
              >
                <option value="" disabled>
                  Choose a type for the project
                </option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Educational">Educational</option>
                <option value="Sports">Sports</option>
                <option value="Hotels">Hotels</option>
                <option value="General">General</option>
              </select>
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="date">Year</label>
              <input
                className="form-control"
                type="number"
                name="year"
                id="date"
                placeholder="Project year"
                autoComplete="off"
                onChange={handleChange}
                value={body.year}
              />
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="stage">Stage</label>
              <select
                className="form-select"
                name="stage"
                id="stage"
                onChange={handleChange}
                value={body.stage}
                required
              >
                <option value="" disabled>
                  Choose a stage for the project
                </option>
                <option value="Design">Design</option>
                <option value="Construction">Construction</option>
                <option value="Design & Construction">
                  Design & Construction
                </option>
              </select>
            </div>
            <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="location">Location</label>
              <input
                className="form-control"
                type="text"
                name="location"
                id="location"
                placeholder="Project location"
                autoComplete="off"
                onChange={handleChange}
                value={body.location}
              />
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
              placeholder="Project description"
              onChange={handleChange}
              value={body.description}
            ></textarea>
          </div>
          <p className="mb-0">Related Services</p>
          {checkedServices &&
            services.map((service, index) => (
              <div key={index} className="form-check mb-1">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={service.slug}
                  value={service.slug}
                  id={service.slug}
                  checked={checkedServices[index]}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label htmlFor={service.slug} className="form-check-label">
                  {service.title}
                </label>
              </div>
            ))}
          <div className="form-group mt-2">
            <label htmlFor="cover">Cover Image</label>
            <input
              className="form-control"
              type="file"
              name="cover"
              id="cover"
              title=""
              onChange={readURL}
              style={{ height: "fit-content" }}
            />
            <div className="bg-secondary">
              <div className="d-flex justify-content-center w-50 mx-auto my-3 py-3">
                <img
                  src="#"
                  alt="preview"
                  ref={imagePreview}
                  style={{ display: "none" }}
                />
                <span
                  ref={defaultText}
                  className="text-light text-center"
                  style={{ display: "block" }}
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
