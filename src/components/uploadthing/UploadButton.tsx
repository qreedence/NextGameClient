import { generateUploadButton } from "@uploadthing/react";
import { UploadRouter } from "../../uploadthing/uploadthing";

export const UploadButton = generateUploadButton<UploadRouter>({
    url: 'https://localhost:7145/api/uploadthing'
});