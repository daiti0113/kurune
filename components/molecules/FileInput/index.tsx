import { useWindowSize } from "@/hooks/window";
import { forwardRef, useRef, useState } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

type FileInputProps = {
    onDrop: <T extends File>(acceptedFiles: T[], fileRejections?: FileRejection[], event?: DropEvent) => void
}

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(function FileInputInner({onDrop}, ref){
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });
    const { width } = useWindowSize()
  const [url, setUrl] = useState("");
  const fileUpload = () => {
    if (ref && typeof ref !== 'function') ref.current?.click()
  };

  const onFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files == null) return;
    console.log(event.target.files[0]);
    onDrop([event.target.files[0]])
  };

    if (width > 960) {
        return (
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600" {...getRootProps()}>
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input {...getInputProps()} ref={ref} />
                </label>
            </div>
          )
    }
    return (
        <div className="col-span-3 flex justify-center w-full">
            <button
                onClick={fileUpload}
                className="bg-blue-500 rounded text-white font-bold py-2 px-4 w-full"
            >
                ファイルを選択
            </button>
            <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png"
                ref={ref}
                onChange={onFileInputChange}
            />
        </div>
    )
})
