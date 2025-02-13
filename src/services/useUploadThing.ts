import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { FileUploadRequestPayload, UploadThingService } from "../apiclient";
import axios, { AxiosResponse } from "axios";
import useAuth from "./useAuth";

const useUploadThing = () => {
    const queryClient = useQueryClient();
    const {isAuthenticated, isLoadingIsAuthenticated} = useAuth();
    
    //get endpoint metadata
    const {data: getMetaData} = useQuery({
        queryKey: ["endpointMetadata"],
        queryFn: async () => {
            return await UploadThingService.getApiUploadthing();
        },
        enabled: isLoadingIsAuthenticated === false && isAuthenticated === true,
    });

    //get presigned URLs
    const {mutate: createPresignedUrls, isPending: creatingPresignedUrls} = useMutation<{ presignedUrl: string }, Error, FileUploadRequestPayload>({
        mutationFn: async(fileUploadRequestPayload: FileUploadRequestPayload) => {
            const response = await UploadThingService.postApiUploadthing(fileUploadRequestPayload, "profilePicture", "upload");
            return { presignedUrl: response.url };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["uploadedFiles"]});
        }
    });

    //upload to presigned url
    const {mutate: uploadToPresignedUrl} = useMutation<AxiosResponse, Error, { url: string; file: File }>({
        mutationFn: async ({ url, file }) => {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.put(url, formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            });
          if (response.status < 200 || response.status >= 300) {
            throw new Error(`Upload failed with status: ${response.status}`);
          }
          return response;
        },
        onSuccess: () => {

        },
        onError: (error) => {
          console.error("Error uploading file:", error);
        },
      });


    return {
        createPresignedUrls, creatingPresignedUrls,
        getMetaData,
        uploadToPresignedUrl
    }
}

export default useUploadThing;