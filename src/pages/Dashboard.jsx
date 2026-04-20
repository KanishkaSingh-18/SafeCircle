import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const nameOrEmail = currentUser?.displayName || currentUser?.email || 'User';

  async function handleLogout() {
    setError('');
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      setError(err?.message || 'Failed to logout');
      setLoading(false);
    }
  }

  return (
    <main className="w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
  <header className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/50 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-[#7c5be6]">Welcome, {nameOrEmail}</h1>
              <p className="mt-2 text-sm text-slate-600">This is your SafeCircle dashboard — quick access to emergency tools and your personal safety settings.</p>
            </div>

            <div className="flex items-center gap-3">
              {error && <div className="text-sm text-rose-700">{error}</div>}
              {/* Logout button intentionally removed from this header per design — kept in navbar only */}
            </div>
          </div>
        </header>

        {/* Emergency Categories glass card */}
  <section className="mt-10">
          <div className="bg-white/60 backdrop-blur-md rounded-[28px] border border-white/50 shadow-[0_18px_50px_rgba(15,23,42,0.06)] p-6">
            <h2 className="text-2xl font-semibold text-rose-700">Emergency Categories</h2>
            <p className="mt-1 text-sm text-slate-600">Quick access to common emergency types.</p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <article className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-rose-700">Women Safety</h3>
                <p className="mt-2 text-sm text-slate-700">Tools and contacts focused on women's safety and rapid response.</p>
                <Link to="/category/women-safety" className="mt-4 inline-block text-rose-600 font-medium hover:underline">Open</Link>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-sky-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-sky-700">Child Safety</h3>
                <p className="mt-2 text-sm text-slate-700">Resources and steps to protect children in emergencies.</p>
                <Link to="/category/child-safety" className="mt-4 inline-block text-sky-600 font-medium hover:underline">Open</Link>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-emerald-700">Medical Emergency</h3>
                <p className="mt-2 text-sm text-slate-700">Immediate medical response guidance and nearby services.</p>
                <Link to="/category/medical" className="mt-4 inline-block text-emerald-600 font-medium hover:underline">Open</Link>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-amber-700">Fire &amp; Rescue</h3>
                <p className="mt-2 text-sm text-slate-700">Fire safety steps and contact details for rescue teams.</p>
                <Link to="/category/fire" className="mt-4 inline-block text-amber-600 font-medium hover:underline">Open</Link>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-violet-700">Police Help</h3>
                <p className="mt-2 text-sm text-slate-700">Contact and quick actions to reach law enforcement.</p>
                <Link to="/category/police" className="mt-4 inline-block text-violet-600 font-medium hover:underline">Open</Link>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 to-lime-50 border border-white/40 shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5">
                <h3 className="font-semibold text-lime-700">Disaster Response</h3>
                <p className="mt-2 text-sm text-slate-700">Guides and coordinated response resources for disasters.</p>
                <Link to="/category/disaster" className="mt-4 inline-block text-lime-600 font-medium hover:underline">Open</Link>
              </article>
            </div>
          </div>
        </section>

        {/* Quick Actions glass card */}
        <section className="mt-10">
          <div className="bg-white/60 backdrop-blur-md rounded-[28px] border border-white/50 shadow-[0_24px_60px_rgba(15,23,42,0.06)] p-6">
            <h2 className="text-2xl font-semibold text-rose-700">Quick Actions</h2>
            <p className="mt-1 text-sm text-slate-600">Common tasks to manage your safety settings.</p>

            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/sos')}
                className="inline-flex items-center px-5 py-2 rounded-full bg-rose-100 text-rose-800 shadow-sm hover:bg-rose-200 transition"
              >
                Manage SOS Contacts
              </button>
              {/* Emergency Resources button removed (Resources page deprecated) */}
              <button
                onClick={() => navigate('/guides')}
                className="inline-flex items-center px-5 py-2 rounded-full bg-violet-100 text-violet-800 shadow-sm hover:bg-violet-200 transition"
              >
                Safety Guides
              </button>
              <button
                onClick={() => navigate('/emergency-toolkit')}
                className="inline-flex items-center px-5 py-2 rounded-full bg-amber-100 text-amber-800 shadow-sm hover:bg-amber-200 transition"
              >
                Emergency Toolkit
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
