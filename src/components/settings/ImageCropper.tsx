import {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import {
  Cropper,
  CropperRef,
  CircleStencil,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useStore } from "../../stores/useStore";
import useAuth from "../../hooks/useAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

interface ImageCropperProps {
  onCrop: (croppedFile: File | null) => void;
  file: File | null;
}

export interface ImageCropperHandle {
  open: (file: File) => void;
  close: () => void;
}

const ImageCropper = forwardRef<ImageCropperHandle, ImageCropperProps>(
  ({ onCrop }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const cropperRef = useRef<CropperRef>(null);
    const { setTemporaryProfilePicture } = useStore();
    const { userProfile } = useAuth();

    const handleOpen = useCallback(() => {
      setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
      setIsOpen(false);
      setImageSrc(null);
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        open: (file: File) => {
          setImageSrc(URL.createObjectURL(file));
          handleOpen();
        },
        close: () => {
          handleClose();
        },
      }),
      [handleOpen, handleClose]
    );

    const handleCropComplete = async () => {
      if (!cropperRef.current) return;

      const canvas = cropperRef.current.getCanvas({
        width: 120,
        height: 120,
      });

      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            const croppedFile = new File(
              [blob],
              `${userProfile?.userName.toLowerCase()}-profile-picture.png`,
              {
                type: "image/png",
              }
            );
            onCrop(croppedFile);
            setTemporaryProfilePicture(croppedFile);
            handleClose();
          }
        }, "image/png");
      }
    };

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Crop your profile picture
            </DialogTitle>
            <DialogDescription className="hidden">
              Adjust the crop area to fit your desired profile picture.
            </DialogDescription>
          </DialogHeader>
          {imageSrc && (
            <>
              <Cropper
                backgroundClassName="background-color: bg-base-100"
                ref={cropperRef}
                src={imageSrc}
                stencilComponent={CircleStencil}
                stencilProps={{
                  aspectRatio: 1,
                  resizable: true,
                  handlers: true,
                  movable: true,
                }}
                imageRestriction={ImageRestriction.stencil}
                className="cropper"
              />
            </>
          )}
          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="ghost"
              className="hover:bg-destructive"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="button"
              className="btn btn-neutral"
              onClick={handleCropComplete}
            >
              Crop
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ImageCropper.displayName = "ImageCropper";
export default ImageCropper;
