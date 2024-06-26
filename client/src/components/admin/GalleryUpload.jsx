import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { uploadImage } from "../../services";

const baseStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  transition: "border .3s ease-in-out",
};

const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function GalleryUpload({ setLoading, setBody, body }) {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);

  const readURL = useCallback(
    (image, index, acceptedFilesLength) => {
      const reader = new FileReader();
      setLoading(true);
      reader.onload = async () => {
        const newImage = await uploadImage(image);
        setImages((oldImages) => [...oldImages, newImage]);
        if (index === acceptedFilesLength - 1) {
          setLoading(false);
        }
      };
      reader.readAsDataURL(image);
    },
    [setLoading]
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file, index) => {
        readURL(file, index, acceptedFiles.length);
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [readURL]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs = files.map((file) => (
    <div key={file.name} style={{ width: "200px", height: "200px" }}>
      <img
        src={file.preview}
        alt={file.name}
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  ));

  const prevImages = body.images.map((image, index) => (
    <div key={index} style={{ width: "200px", height: "200px" }}>
      <img
        src={image.image ? image.image : image}
        alt={index + 1}
        style={{
          maxWidth: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  ));

  // clean up
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  useEffect(() => {
    setBody({ ...body, images });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <section>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>Drag and drop your images here.</div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: "1rem",
            alignItems: "stretch",
            justifyContent: "center",
          }}
        >
          {thumbs.length ? thumbs : prevImages}
        </div>
      </div>
    </section>
  );
}

export default GalleryUpload;
