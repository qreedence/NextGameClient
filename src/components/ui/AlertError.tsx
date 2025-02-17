interface AlertErrorProps {
  errorMessages: string[];
}

const AlertError = ({ errorMessages }: AlertErrorProps) => {
  return (
    <div
      role="alert"
      className="alert alert-error mt-2 flex flex-col items-center"
    >
      {errorMessages.length > 1 ? (
        <ul className="list-disc font-semibold flex flex-col gap-1">
          {errorMessages.map((errorMessage, index) => (
            <li key={index}>{errorMessage}</li>
          ))}
        </ul>
      ) : (
        <>{errorMessages[0]}</>
      )}
    </div>
  );
};

export default AlertError;
