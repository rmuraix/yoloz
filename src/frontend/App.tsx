import { useCallback, useMemo } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

import CloudIcon from "./components/cloudIcon";

function App() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
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
      </main>
    </>
  );
}

export default App;
