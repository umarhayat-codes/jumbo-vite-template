import { Div } from "@jumbo/shared";
import { Typography } from "@mui/material";
import React from "react";
import { useDropzone } from "react-dropzone";
import { DndWrapper } from "../../DndWrapper";
import { JumboCard } from "@jumbo/components/JumboCard";

const baseStyle = {
  borderColor: "#eeeeee",
  color: "#bdbdbd",
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

const DzStyled = () => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ accept: "image/*" });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <JumboCard title={"Styling Dropzone"} contentWrapper contentSx={{ pt: 0 }}>
      <Div sx={{ flex: 1 }}>
        <DndWrapper sx={{ borderColor: (theme) => theme.palette.action.hover }}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <Typography variant={"body1"}>
              {`Drag 'n' drop some files here, or click to select files`}
            </Typography>
          </div>
        </DndWrapper>
      </Div>
    </JumboCard>
  );
};

export { DzStyled };
