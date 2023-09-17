"use client"

import { useRef, useState } from "react";
import { useUpload } from "@/hooks/s3";
import { FileInput } from "@/components/molecules/FileInput";

function UploadImage() {
  const [url, setUrl] = useState("");
  const { upload, isLoading } = useUpload()

  return (
    <div className="App">
      <div className="flex justify-center items-center h-screen">
        <img src={url} height={200} width={200} />
        {isLoading ? (
          <h1>アップロード中・・・</h1>
        ) : (
            <FileInput onDrop={upload} />
        )}
      </div>
    </div>
  );
}

export default UploadImage;