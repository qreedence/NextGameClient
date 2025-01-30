interface AlertErrorProps{
    errorMessages: string[]
}

const AlertError = ({errorMessages} : AlertErrorProps) => {
    return (
            <div role="alert" className="alert alert-error mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>
                    {errorMessages.length > 1 
                    ? (<ul>
                        {errorMessages.map((errorMessage, index) => (
                            <li key={index}>{errorMessage}</li>))}
                        </ul>) 
                    : (<>{errorMessages[0]}</>
                )}
            </span>
            </div>
    )
};

export default AlertError;