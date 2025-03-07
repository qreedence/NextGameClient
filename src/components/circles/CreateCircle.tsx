import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import useCreateCircle from "@/hooks/circles/useCreateCircle";
import { PulseLoader } from "react-spinners";

const CreateCircle = () => {
  const [circleName, setCircleName] = useState<string>("");
  const { createCircle, isPending } = useCreateCircle({ circleName });

  return (
    <div className="flex gap-2">
      <Input
        value={circleName}
        onChange={(e) => {
          setCircleName(e.target.value);
        }}
        placeholder="Circle name"
      ></Input>
      <Button
        onClick={() => {
          if (circleName.length > 0) {
            createCircle();
          }
        }}
      >
        {isPending ? <PulseLoader size={5} color="white" /> : "Create"}
      </Button>
    </div>
  );
};

export default CreateCircle;
