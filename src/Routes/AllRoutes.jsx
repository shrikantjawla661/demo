/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationForm from "../pages/ApplicationForm";
import HomePage from "../pages/Home";
import CongratulationPage from "../pages/CongratulationPage";
import TrackApplicationPage from "../pages/TrackApplicationPage";
import Login from "../pages/Login";
import ApplicationRejectedUIPage from "../pages/ApplicationRejectedUIPage";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply-axis-card" element={<ApplicationForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app-congrats-page" element={<CongratulationPage />} />
      <Route path="/app-rejected-page" element={<ApplicationRejectedUIPage />} />
      <Route path="/track-applications" element={<TrackApplicationPage />} />
    </Routes>
  );
}

export default AllRoutes;
