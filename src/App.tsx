import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "./components/ui/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-base-200 pb-8 min-h-screen">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </div>

    </QueryClientProvider>
  )};

export default App
