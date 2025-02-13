import React, { useState } from "react";
import { FileUploadRequest } from "../../apiclient/models/FileUploadRequest";
import useUploadThing from "../../services/useUploadThing";
import { FileUploadRequestPayload } from "../../apiclient";

const UploadProfilePicture: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const { createPresignedUrls, creatingPresignedUrls, uploadToPresignedUrl } = useUploadThing();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("Please select a file.");
      return;
    }
    try {
        const fileUploadRequest: FileUploadRequest = {
          name: file.name,
          size: file.size,
          type: file.type,
        };
       
        const payload: FileUploadRequestPayload = {
            files: [fileUploadRequest],
        };

        createPresignedUrls(payload, {
            onSuccess: (data) => {
                uploadToPresignedUrl({url: data.presignedUrl, file: file});
            }
        });
      } catch (error) {
        console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Change profile picture</legend>
        <input id="profilePicture" className="file-input" type="file" onChange={handleFileChange} disabled={creatingPresignedUrls} />
        <button type="button" className="btn btn-neutral w-full" onClick={handleUpload} disabled={creatingPresignedUrls || !file}>
          {creatingPresignedUrls ? "Uploading..." : "Upload"}
        </button>
      </fieldset> 
  </div>
  );
};

export default UploadProfilePicture;