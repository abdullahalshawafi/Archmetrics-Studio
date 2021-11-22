import React, { useEffect, useRef, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

function AdminServices({ adminPage, setAdminPage }) {
  const [body, setBody] = useState({
    title: "",
    summary: "",
    description: "",
    image: "",
  });

  const defaultText = useRef(null);
  const imagePreview = useRef(null);
  useEffect(() => {
    setAdminPage("services");
  });

  const readURL = (input) => {
    if (input.target.files.length) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBody({ ...body, image: input.target.files[0] });
        defaultText.current.setAttribute("style", "display: none;");
        imagePreview.current.setAttribute("src", e.target.result);
        imagePreview.current.setAttribute(
          "style",
          "display: block; max-width: 100%; height: auto;"
        );
      };
      reader.readAsDataURL(input.target.files[0]);
    } else {
      defaultText.current.setAttribute("style", "display: block;");
      imagePreview.current.setAttribute("src", "#");
      imagePreview.current.setAttribute("style", "display: none;");
    }
  };

  const handleChange = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(body);

    setBody({
      title: "",
      summary: "",
      description: "",
      image: "",
    });
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
              placeholder="Title"
              autoComplete="off"
              onChange={handleChange}
              value={body.title}
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
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="cover">Cover Image</label>
            <input
              className="form-control"
              type="file"
              name="image"
              id="cover"
              onChange={readURL}
              style={{ height: "fit-content" }}
            />
            <div className="bg-secondary">
              <div className="w-50 mx-auto my-3 py-3">
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
