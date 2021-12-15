import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { createService, uploadServiceCover } from "../../services/services";

function AdminServices({ adminPage, setAdminPage }) {
  const [body, setBody] = useState({
    title: "",
    summary: "",
    description: "",
    cover: "",
  });

  const defaultText = useRef(null);
  const imagePreview = useRef(null);

  useEffect(() => {
    setAdminPage("services");
  });

  const removeImagePreview = () => {
    defaultText.current.setAttribute("style", "display: block;");
    imagePreview.current.setAttribute("src", "#");
    imagePreview.current.setAttribute("style", "display: none;");
  };

  const readURL = (input) => {
    if (input.target.files.length) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setBody({
          ...body,
          cover: await uploadServiceCover(input.target.files[0]),
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(body);

    if ((await createService(body)) === 200) {
      removeImagePreview();
      setBody({
        title: "",
        summary: "",
        description: "",
        cover: "",
      });
    } else {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <AdminLayout adminPage={adminPage}>
      <div className="pt-5 m-5">
        <h2 className="page-title">Add a service</h2>
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
              onChange={handleChange}
              value={body.summary}
              required
            ></textarea>
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
              style={{ height: "fit-content" }}
              required
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
