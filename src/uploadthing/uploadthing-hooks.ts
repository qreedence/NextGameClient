import { generateReactHelpers } from "@uploadthing/react";
import { UploadRouter } from "./uploadthing";


export const { useUploadThing, uploadFiles } = generateReactHelpers<UploadRouter>({
    url: "https://localhost:7145/api/uploadthing",
  });