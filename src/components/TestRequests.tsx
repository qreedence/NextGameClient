import { useQuery } from "@tanstack/react-query";
import { testAsync } from "../services/testService";

const TestRequests = () => {

    const {isPending, error, data} = useQuery({
        queryKey: ['test'],
        queryFn: testAsync
    });

    if (isPending) return "Loading...";
    if (error) return `Error: ${error}`;

    return (
        <p className="text-gray-50 font-semibold text-lg">Data: {data} </p>
    )
}

export default TestRequests;