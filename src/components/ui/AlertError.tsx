import { Alert } from "./alert";

interface AlertErrorProps {
  errorMessage: string;
}

const AlertError = ({ errorMessage }: AlertErrorProps) => {
  const errorMessages = errorMessage.split(",").map((msg) => msg.trim());

  return (
    <Alert
      variant={"destructive"}
      role="alert"
      className="mt-2 flex flex-col items-center"
    >
      {errorMessages.length > 1 ? (
        <ul className="font-semibold flex flex-col gap-1">
          {errorMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        <>{errorMessages[0]}</>
      )}
    </Alert>
  );
};

export default AlertError;
