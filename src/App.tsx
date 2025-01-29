import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import TestRequests from "./components/TestRequests"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-indigo-900 py-8 min-h-screen">
        <div className="flex justify-center">
          <p className="font-bold text-gray-50">
            Navbar goes here
          </p>
        </div>
        <TestRequests/>
      </div>
    </QueryClientProvider>
  )};

export default App
