import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "./alert-dialog";

interface AlertPopupProps {
  title: string;
  description: string;
  continueAction: () => void;
  cancelAction?: () => void;
}

const AlertPopup = ({
  title,
  description,
  continueAction,
  cancelAction,
}: AlertPopupProps) => {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelAction && (
            <AlertDialogCancel onClick={cancelAction}>Cancel</AlertDialogCancel>
          )}
          <AlertDialogAction onClick={continueAction}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
