import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NavBar from "./components/ui/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Privacy from "./pages/Privacy";
import Settings from "./pages/Settings";
import TermsOfService from "./pages/TermsOfService";
import ExternalToken from "./pages/ExternalToken";
import RedirectLoggedIn from "./components/auth/RedirectLoggedIn";
import RedirectLoggedOut from "./components/auth/RedirectLoggedOut";
import { ThemeProvider } from "./components/ui/theme-provider";
import { Toaster } from "./components/ui/sonner";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Friends from "./pages/Friends";
import UserPage from "./pages/UserPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="bg-background pb-8 min-h-screen w-full">
          <NavBar />
          <div className="md:px-[20%]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/termsofservice" element={<TermsOfService />} />
              <Route path="/login/external/" element={<ExternalToken />} />
              <Route path="/u/:username" element={<UserPage />} />
              <Route element={<RedirectLoggedIn />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                  path="/reset-password/:token"
                  element={<ResetPassword />}
                />
              </Route>
              <Route element={<RedirectLoggedOut />}>
                <Route path="/settings" element={<Settings />} />
                <Route path="/friends" element={<Friends />} />
              </Route>
            </Routes>
            <Toaster />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

