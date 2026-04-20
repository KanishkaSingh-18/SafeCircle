import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute2';
import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SOSPage = lazy(() => import('./pages/SOSPage'));
const GuidesPage = lazy(() => import('./pages/GuidesPage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const EmergencyToolkit = lazy(() => import('./pages/EmergencyToolkit'));

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/sos"
            element={<ProtectedRoute><SOSPage /></ProtectedRoute>}
          />
          <Route
            path="/guides"
            element={<ProtectedRoute><GuidesPage /></ProtectedRoute>}
          />
          <Route
            path="/category/:id"
            element={<ProtectedRoute><CategoryPage /></ProtectedRoute>}
          />
          <Route
            path="/emergency-toolkit"
            element={<ProtectedRoute><EmergencyToolkit /></ProtectedRoute>}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
