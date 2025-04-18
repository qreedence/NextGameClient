import useAddGameToCircle from "@/hooks/circles/useAddGameToCircle";
import { AddGameToCircleRequestDTO } from "@/apiclient";
import { Gamepad2, RotateCw } from "lucide-react";
import { FaArchive } from "react-icons/fa";

interface AddGameToCircleButtonProps {
  requestDTO: AddGameToCircleRequestDTO;
}

const AddGameToCircleButton = ({ requestDTO }: AddGameToCircleButtonProps) => {
  const { addGameToCircle } = useAddGameToCircle({
    circleId: requestDTO.circleId!,
  });

  return (
    <button
      className="py-1 px-2 flex items-center gap-2"
      onClick={() => {
        addGameToCircle(requestDTO);
      }}
    >
      {requestDTO.gameStatus === 1 && (
        <>
          <Gamepad2 className="size-5" /> Set as Currently Playing
        </>
      )}
      {requestDTO.gameStatus === 2 && (
        <>
          <RotateCw className="size-5" /> Add to Rotation
        </>
      )}
      {requestDTO.gameStatus === 3 && (
        <>
          <FaArchive /> Add to Backlog
        </>
      )}
    </button>
  );
};

export default AddGameToCircleButton;
