import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Layout from "./routes";
import Series from "./routes/series";
import SeriesForm from "./routes/series/form";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      document &&
      location.pathname !== "/" &&
      !localStorage.getItem("token")
    ) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" index element={<Layout />} />
      <Route path="/series" element={<Series />} />
      <Route path="/series/add" element={<SeriesForm />} />
    </Routes>
  );
}

export default App;
