import React, { useEffect, useRef, useState } from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import AdminLayout from "../../layouts/AdminLayout";
import { uploadCover } from "../../services";
import { createProject } from "../../services/projects";
import { getServices } from "../../services/services";

function AdminServices({ adminPage, setAdminPage }) {
  const [services, setServices] = useState(null);
  const [checkedServices, setCheckedServices] = useState(null);
  const [body, setBody] = useState({
    title: "",
    year: "",
    location: "",
    client: "",
    description: "",
    services: [],
    cover: "",
    images: [],
    type: [],
    stages: [],
  });

  const imagePreview = useRef(null);
  const defaultText = useRef(null);

  const removeImagePreview = () => {
    defaultText.current.setAttribute("style", "display: block;");
    imagePreview.current.setAttribute("src", "#");
    imagePreview.current.setAttribute("style", "display: none;");
  };

  useEffect(() => {
    setAdminPage("projects");
  });

  useEffect(() => {
    getServices(setServices);
  }, []);

  useEffect(() => {
    if (services) {
      setCheckedServices(new Array(services.length).fill(false));
    }
  }, [services]);

  const readURL = (input) => {
    if (input.target.files.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setBody({ ...body, cover: await uploadCover(input.target.files[0]) });
        defaultText.current.setAttribute("style", "display: none;");
        imagePreview.current.setAttribute("src", e.target.result);
        imagePreview.current.setAttribute(
          "style",
          "display: block; max-width: 100%; height: auto;"
        );
      };
      reader.readAsDataURL(input.target.files[0]);
    } else {
      removeImagePreview();
    }
  };

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
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
    e.preventDefault();
    console.log(body);
    if ((await createProject(body)) === 200) {
      removeImagePreview();
      setCheckedServices(new Array(services.length).fill(false));
      setBody({
        title: "",
        year: "",
        location: "",
        client: "",
        description: "",
        services: [],
        cover: "",
        images: [],
        type: [],
        stages: [],
      });
      alert("Project created successfully!");
      window.location.reload();
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AdminLayout adminPage={adminPage}>
      <div className="pt-5 m-5">
        <h2 className="page-title">Add a project</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group mb-3">
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
          <div className="row">
          <div className="col-12 col-md-6 form-group mb-3">
              <label htmlFor="date">year</label>
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
              <label htmlFor="client">location</label>
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
            {/* <CKEditor
              editor={ClassicEditor}
              data=""
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            /> */}
          </div>
          <p className="mb-0">Related Services</p>
          {checkedServices &&
            services?.map((service, index) => (
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
          <button className="btn btn-warning">Submit</button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AdminServices;
