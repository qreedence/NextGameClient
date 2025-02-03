import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "./components/ui/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-base-200 pb-8 min-h-screen w-full">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
      </div>

    </QueryClientProvider>
  )};

export default App
