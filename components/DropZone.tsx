import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export type IFileObject = {
  name: string;
  data: string;
};
interface IDropZone {
  files: IFileObject[];
  setFiles: React.Dispatch<React.SetStateAction<IFileObject[]>>;
  buttonText?: string;
}

export const Dropzone = (props: IDropZone): JSX.Element => {
  const { files, setFiles, buttonText= "Добавить файлы"} = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      let fileArray: IFileObject[] = [];
      acceptedFiles.forEach((file: File) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result as string;
          fileArray.push({ name: file.name, data: binaryStr });
        };
      });
      setFiles(fileArray);
    },
    [setFiles]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      
      <p className="btn btn-outline-success ">{buttonText}</p>
    </div>
  );
};
