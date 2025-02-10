import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import NavBar from "./components/ui/NavBar"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Privacy from "./pages/Privacy"
import Settings from "./pages/Settings"
import TermsOfService from "./pages/TermsOfService"
import ExternalToken from "./pages/ExternalToken"
import RedirectLoggedIn from "./components/auth/RedirectLoggedIn"
import RedirectLoggedOut from "./components/auth/RedirectLoggedOut"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-base-200 pb-8 min-h-screen w-full">
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/privacy" element={<Privacy/>}/>
        <Route path="/termsofservice" element={<TermsOfService/>}/>
        <Route path="/login/external/" element={<ExternalToken/>}/>
        <Route element={<RedirectLoggedIn/>}>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Route>
        <Route element={<RedirectLoggedOut/>}>
          <Route path="/settings" element={<Settings/>}/>
        </Route>

      </Routes>
      </div>
    </QueryClientProvider>
  )};

export default App
