import { CircleService } from "@/apiclient/services/CircleService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateCircleProps {
  circleName: string;
}

const useCreateCircle = ({ circleName }: CreateCircleProps) => {
  const { mutate: createCircle, isPending } = useMutation({
    mutationFn: async () => {
      return await CircleService.createCircle(circleName);
    },
    onSuccess: () => {
      toast(`Successfully created a circle with the name ${circleName}`);
    },
  });

  return { createCircle, isPending };
};

export default useCreateCircle;
