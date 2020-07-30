import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { objectValues } from "react-toastify/dist/utils";
import { Icon, Header } from "semantic-ui-react";

interface IProps {
  setFiles: (files: object[]) => void;
}

const dropzoneStyles = {
  border: "dashed 3px",
  borderColor: "#eee",
  borderRadius: "5px",
  paddingTop: "30px",
  textAlign: 'center' as 'center',
  height: "200px",
};

const dropzoneActive = {
  borderColor: "green",
};

const PhotoWidgetDropzone: React.FC<IProps> = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file: object) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop Image Here' />
    </div>
  );
};

export default PhotoWidgetDropzone;