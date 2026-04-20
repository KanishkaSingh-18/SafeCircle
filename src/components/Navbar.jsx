import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
      navigate('/login');
    } catch {
      // ignore for now; could show toast
    } finally {
      setLoading(false);
    }
  }

  // Emergency siren audio (single instance)
  const audioRef = useRef(null);
  const [sirenOn, setSirenOn] = useState(false);

  useEffect(() => {
    if (!audioRef.current) {
      try {
        audioRef.current = new Audio('/siren.mp3');
        audioRef.current.loop = true;
      } catch (err) {
        console.error('Failed to create siren audio', err);
      }
    }

    return () => {
      try {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          audioRef.current = null;
        }
      } catch (err) {
        // swallow cleanup errors
      }
    };
  }, []);

  useEffect(() => {
    const id = 'siren-pulse-keyframes';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.innerHTML = `
        @keyframes sirenPulse {
          0% { box-shadow: 0 6px 16px rgba(255,59,92,0.28); }
          50% { box-shadow: 0 8px 18px rgba(255,59,92,0.32); }
          100% { box-shadow: 0 6px 16px rgba(255,59,92,0.28); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  function toggleSiren() {
    const audio = audioRef.current;
    if (!audio) return;

    if (!sirenOn) {
      audio.play().then(() => {
        setSirenOn(true);
      }).catch((err) => {
        console.error('Failed to play siren', err);
      });
    } else {
      try {
        audio.pause();
        audio.currentTime = 0;
      } catch (err) {
        console.error('Failed to stop siren', err);
      }
      setSirenOn(false);
    }
  }

  const sirenButtonStyle = {
    width: 42,
    height: 42,
    borderRadius: 999,
    background: sirenOn
      ? 'linear-gradient(135deg,#ff6b6b,#ff2333)'
      : 'linear-gradient(135deg,#ff5f6d,#ff3b5c)',
    color: '#ffffff',
    boxShadow: sirenOn
      ? '0 8px 20px rgba(255,59,92,0.35)'
      : '0 6px 16px rgba(255,59,92,0.28)',
    opacity: 1,
    border: 'none',
    transform: hover ? 'scale(1.04)' : (sirenOn ? 'scale(1.02)' : 'scale(1)'),
    transition: 'transform 180ms ease, box-shadow 180ms ease, background 180ms ease',
    animation: sirenOn ? 'sirenPulse 3.8s ease-in-out infinite' : 'none',
  };

  const SirenIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 14h10l-1-4a4 4 0 0 0-8 0l-1 4z" />
      <rect x="9" y="14" width="6" height="2" rx="1" />
      <line x1="4" y1="10" x2="2.5" y2="10" />
      <line x1="21.5" y1="10" x2="20" y2="10" />
      <line x1="6" y1="6.5" x2="4.8" y2="5.3" />
      <line x1="18" y1="6.5" x2="19.2" y2="5.3" />
      <line x1="12" y1="4.5" x2="12" y2="3" />
    </svg>
  );

  return (
    <nav className="sticky top-0 z-40">
      <div className="backdrop-blur-md bg-white/60 border border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-4 md:py-3">
            <div className="flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-extrabold text-rose-700">
                SafeCircle
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link to="/dashboard" className="text-slate-700 hover:text-rose-700 px-3 py-1 rounded-full transition hover:bg-rose-50">
                Dashboard
              </Link>
              <Link to="/sos" className="text-slate-700 hover:text-rose-700 px-3 py-1 rounded-full transition hover:bg-rose-50">
                SOS
              </Link>
              <Link to="/guides" className="text-slate-700 hover:text-rose-700 px-3 py-1 rounded-full transition hover:bg-rose-50">
                Guides
              </Link>
              <Link to="/emergency-toolkit" className="text-slate-700 hover:text-rose-700 px-3 py-1 rounded-full transition hover:bg-rose-50">
                Toolkit
              </Link>

              <button
                type="button"
                title="Emergency Siren"
                onClick={toggleSiren}
                aria-pressed={sirenOn}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="flex items-center justify-center transition-transform transform focus:outline-none"
                style={sirenButtonStyle}
              >
                <SirenIcon />
              </button>

              {currentUser ? (
                <button
                  onClick={handleLogout}
                  disabled={loading}
                  className="ml-4 px-3 py-1 bg-rose-100 text-rose-700 rounded-full shadow-sm hover:bg-rose-200 transition disabled:opacity-50"
                >
                  {loading ? 'Signing out…' : 'Logout'}
                </button>
              ) : null}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setOpen((s) => !s)}
                className="p-2 rounded-md text-slate-600 hover:bg-white/30 transition"
                aria-label="Toggle menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/30 bg-white/60 backdrop-blur-md shadow-sm">
          <div className="px-4 py-3 space-y-2">
            <Link to="/dashboard" onClick={() => setOpen(false)} className="block text-slate-700 px-2 py-1 rounded-md hover:bg-rose-50">
              Dashboard
            </Link>
            <Link to="/sos" onClick={() => setOpen(false)} className="block text-slate-700 px-2 py-1 rounded-md hover:bg-rose-50">
              SOS
            </Link>
            <Link to="/guides" onClick={() => setOpen(false)} className="block text-slate-700 px-2 py-1 rounded-md hover:bg-rose-50">
              Guides
            </Link>

            <div className="flex items-center gap-3">
              <button
                type="button"
                title="Emergency Siren"
                onClick={() => { toggleSiren(); setOpen(false); }}
                aria-pressed={sirenOn}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                className="flex items-center justify-center transition-transform transform focus:outline-none"
                style={sirenButtonStyle}
              >
                <SirenIcon />
              </button>

              {currentUser ? (
                <button
                  onClick={() => { setOpen(false); handleLogout(); }}
                  disabled={loading}
                  className="w-full text-left px-3 py-2 bg-rose-100 text-rose-700 rounded-md shadow-sm"
                >
                  {loading ? 'Signing out…' : 'Logout'}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}