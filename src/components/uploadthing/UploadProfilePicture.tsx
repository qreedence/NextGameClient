import React, { useState, useRef, useEffect } from "react";
import { FileUploadRequest } from "../../apiclient/models/FileUploadRequest";
import useUploadThing from "../../hooks/useUploadThing";
import { FileUploadRequestPayload } from "../../apiclient";
import { useStore } from "../../stores/useStore";
import ImageCropper, { ImageCropperHandle } from "../settings/ImageCropper";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UploadProfilePicture: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);
  const { createPresignedUrls, creatingPresignedUrls, uploadToPresignedUrl } =
    useUploadThing();
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

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (croppedImage && !uploaded) {
        event.preventDefault();
        return;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeUnload", handleBeforeUnload);
    };
  }, [croppedImage, uploaded]);

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
        {creatingPresignedUrls ? "Saving..." : "Save Profile Picture"}
      </Button>
      {croppedImage && !uploaded && (
        <p className="text-muted text-xs italic text-center">
          Your profile picture has not been saved yet.
        </p>
      )}
      <ImageCropper ref={cropperRef} onCrop={handleImageCropped} file={file} />
    </div>
  );
};

export default UploadProfilePicture;
