import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "./components/ui/NavBar"
// import RegisterComponent from "./components/auth/RegisterComponent"
import LoginComponent from "./components/auth/LoginComponent"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-base-200 pb-8 min-h-screen">
        <NavBar/>
        <LoginComponent/>
        {/* <RegisterComponent/> */}
        
      </div>

    </QueryClientProvider>
  )};

export default App
