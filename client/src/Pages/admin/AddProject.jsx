import React, { useEffect, useRef, useState } from "react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import AdminLayout from "../../layouts/AdminLayout";
import { services } from "../../services/data";

function AdminServices({ adminPage, setAdminPage }) {
  const [body, setBody] = useState({
    title: "",
    client: "",
    description: "",
    image: "",
  });

  const imagePreview = useRef(null);
  const defaultText = useRef(null);

  useEffect(() => {
    setAdminPage("projects");
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
      client: "",
      description: "",
      image: "",
    });
  };

  return (
    <AdminLayout adminPage={adminPage}>
      <div className="pt-5 m-5">
        <h2 className="page-title">Add a project</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row">
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
          {services.map((service, index) => (
            <div key={index} className="form-check mb-1">
              <input
                type="checkbox"
                className="form-check-input"
                name={service.slug}
                id={service.slug}
                onChange={handleChange}
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
              name="image"
              id="cover"
              title=""
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
