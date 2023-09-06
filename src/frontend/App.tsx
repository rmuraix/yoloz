import { useCallback, useMemo, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import CloudIcon from "./components/cloudIcon";
import axios from "axios";

function App() {
  const [result, setResult] = useState<string | undefined>(undefined);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    // Do whatever you want with the file contents
    const formData = new FormData();
    formData.append("image", acceptedFiles[0]);
    const response = await axios.post("api/data", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    });

    const blob = new Blob([response.data], { type: "image/png" });
    setResult(URL.createObjectURL(blob));
  }, []);
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
  });

  const filesUpdated: FileWithPath[] = acceptedFiles;
  const files = useMemo(
    () =>
      filesUpdated.map((file) => (
        <p key={file.path} className="">
          {file.path} - {file.size} bytes
        </p>
      )),
    [filesUpdated],
  );

  return (
    <>
      <main className="mx-auto min-h-screen max-w-5xl p-8 sm:p-4 text-gray-900 dark:text-white">
        <div {...getRootProps()}>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {}
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <CloudIcon />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG or JPG
                </p>
              </div>
              <input
                {...getInputProps()}
                id="dropzone-file"
                type="file"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg"
              />
            </label>
          </div>
        </div>
        {files}
        <img src={result} alt="Image" />
      </main>
    </>
  );
}

export default App;
