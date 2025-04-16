import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { DndWrapper } from "../../DndWrapper";
import { JumboCard } from "@jumbo/components/JumboCard";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const DzPreviews = () => {
  const [files, setFiles] = React.useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    /**todo accept props use any */
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const filesWithPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(filesWithPreview);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          alt=""
          width={200}
          height={200}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));
  React.useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <JumboCard
      title={"Dropzone with preview"}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <Div sx={{ flex: 1 }}>
        <DndWrapper>
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <Typography variant={"body1"}>
              {`Drag 'n' drop some files here, or click to select files`}
            </Typography>
          </div>
        </DndWrapper>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </Div>
    </JumboCard>
  );
};

export { DzPreviews };
