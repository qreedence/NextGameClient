import React, { useState, useRef, useEffect } from "react";
import { FileUploadRequest } from "../../apiclient/models/FileUploadRequest";
import useUploadThing from "../../hooks/useUploadThing";
import { FileUploadRequestPayload } from "../../apiclient";
import { useStore } from "../../stores/useStore";
import ImageCropper, { ImageCropperHandle } from "../settings/ImageCropper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import PulseLoader from "react-spinners/PulseLoader";

const UploadProfilePicture: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const {
    createPresignedUrls,
    creatingPresignedUrls,
    uploadToPresignedUrl,
    uploadSuccess,
    uploading,
  } = useUploadThing();
  const { setTemporaryProfilePicture } = useStore();
  const cropperRef = useRef<ImageCropperHandle>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      setFile(newFile);
      cropperRef.current?.open(newFile);
    }
  };

  const handleImageCropped = (croppedFile: File | null) => {
    setCroppedImage(croppedFile);
    if (croppedFile) {
      setTemporaryProfilePicture(croppedFile);
    }
  };

  const handleUpload = async () => {
    if (!croppedImage) {
      return;
    }
    try {
      const fileUploadRequest: FileUploadRequest = {
        name: croppedImage.name,
        size: croppedImage.size,
        type: croppedImage.type,
      };

      const payload: FileUploadRequestPayload = {
        files: [fileUploadRequest],
      };

      createPresignedUrls(payload, {
        onSuccess: (data) => {
          uploadToPresignedUrl({
            url: data.presignedUrl,
            file: croppedImage,
          });
          setUploaded(true);
        },
      });
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 items-start relative">
      <label
        htmlFor="profilePicture"
        className="text-md font-semibold tracking-wide"
      >
        Change profile picture
      </label>
      <Input
        id="profilePicture"
        className="hover:cursor-pointer"
        type="file"
        onChange={handleFileChange}
        disabled={creatingPresignedUrls}
      />

      <Button
        type="button"
        className="btn btn-neutral w-full"
        onClick={handleUpload}
        disabled={creatingPresignedUrls || !croppedImage}
      >
        {uploading || creatingPresignedUrls ? (
          <PulseLoader color={"white"} size={7} />
        ) : (
          "Save Profile Picture"
        )}
      </Button>
      {croppedImage && !uploadSuccess && (
        <p className="text-destructive text-xs italic font-semibold text-center">
          Your profile picture has not been saved yet.
        </p>
      )}
      <ImageCropper ref={cropperRef} onCrop={handleImageCropped} file={file} />
    </div>
  );
};

export default UploadProfilePicture;
