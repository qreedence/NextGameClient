import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "./components/ui/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { useStore } from "./stores/useStore"
import { useEffect } from "react"
import Privacy from "./pages/Privacy"
import TermsOfService from "./pages/TermsOfService"
import ExternalToken from "./pages/ExternalToken"

const queryClient = new QueryClient()

function App() {
  const { checkAuthentication } = useStore();

  useEffect(() => {
    const fetchAuthStatus = async () => {
        await checkAuthentication();
    };

    fetchAuthStatus();
}, [checkAuthentication]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-base-200 pb-8 min-h-screen w-full">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/termsofservice" element={<TermsOfService/>}/>
        <Route path="/login/external/" element={<ExternalToken/>}/>
      </Routes>
      </div>

    </QueryClientProvider>
  )};

export default App
