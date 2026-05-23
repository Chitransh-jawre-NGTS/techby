import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AppRoutes from "./routes/Routing";
import { useAutoLogout } from "../hooks/TokenExpire";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import AppInitializer from "./Initializers/AppInitializer";



function App() {
  return (
    <Router>
       <AppInitializer />
      {/* hook must run inside Router context */}
       <Toaster position="top-right" />
      <AutoLogout />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col ">
        <main className="flex-1 ">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

// separate component so hook is called within Router
function AutoLogout() {
  useAutoLogout();
  return null;
}

export default App;
