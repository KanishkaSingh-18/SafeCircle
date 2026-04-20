import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmergencyToolkit() {
  const navigate = useNavigate();

  // --- Location Share ---
  const [locationStatus, setLocationStatus] = useState('');
  const [coords, setCoords] = useState(null);
  const [mapsLink, setMapsLink] = useState('');

  async function getLocation() {
    setLocationStatus('Locating...');
    setCoords(null);
    setMapsLink('');

    if (!navigator.geolocation) {
      setLocationStatus('Geolocation not supported by this browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        const link = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
        setMapsLink(link);
        setLocationStatus('Location found');
      },
      (err) => {
        console.error('Geolocation error', err);
        if (err.code === 1) setLocationStatus('Permission denied');
        else setLocationStatus('Unable to determine location');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  function clearLocation() {
    setCoords(null);
    setMapsLink('');
    setLocationStatus('');
  }

  function copyLink() {
    if (!mapsLink) return;
    navigator.clipboard.writeText(mapsLink).then(() => {
      setLocationStatus('Link copied to clipboard');
    }).catch(() => setLocationStatus('Copy failed'));
  }

  function shareWhatsApp() {
    if (!mapsLink) return;
    const message = `I need help — my location: ${mapsLink}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(wa, '_blank');
  }

  // --- Audio Recording ---
  const [recState, setRecState] = useState('idle'); // idle, recording, stopped
  const [mediaUrl, setMediaUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chunksRef = useRef([]);

  async function startRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      chunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data && e.data.size) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setMediaUrl(url);
        // stop all tracks
        try { mediaStreamRef.current.getTracks().forEach(t => t.stop()); } catch (err) {}
        mediaStreamRef.current = null;
        setRecState('stopped');
      };
      mr.start();
      setRecState('recording');
    } catch (err) {
      console.error('startRecording error', err);
      setRecState('idle');
    }
  }

  function stopRecording() {
    try {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    } catch (err) {
      console.error('stopRecording error', err);
    }
  }

  function deleteRecording() {
    if (mediaUrl) {
      try { URL.revokeObjectURL(mediaUrl); } catch (err) {}
    }
    setMediaUrl(null);
    setRecState('idle');
  }

  // --- Quick Photo Capture ---
  const videoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [photoUrl, setPhotoUrl] = useState(null);
  const [cameraError, setCameraError] = useState('');

  async function startCamera() {
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      setCameraStream(stream);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('startCamera error', err);
      setCameraError('Camera access denied or unavailable');
    }
  }

  function stopCamera() {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
        setCameraStream(null);
      }
      if (videoRef.current) videoRef.current.srcObject = null;
    } catch (err) {
      console.error('stopCamera', err);
    }
  }

  function capturePhoto() {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = photoCanvasRef.current || document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setPhotoUrl(url);
      try { stopCamera(); } catch (err) {}
    }, 'image/jpeg', 0.92);
  }

  function deletePhoto() {
    if (photoUrl) {
      try { URL.revokeObjectURL(photoUrl); } catch (err) {}
    }
    setPhotoUrl(null);
  }

  // --- Video Recording (camera) ---
  const [videoRecState, setVideoRecState] = useState('idle'); // idle, recording, stopped
  const [videoUrl, setVideoUrl] = useState(null);
  const videoRecorderRef = useRef(null);
  const videoStreamRef = useRef(null);
  const videoChunksRef = useRef([]);

  async function startVideoRecording() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      videoStreamRef.current = stream;
      videoChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      videoRecorderRef.current = mr;
      mr.ondataavailable = (e) => { if (e.data && e.data.size) videoChunksRef.current.push(e.data); };
      mr.onstop = () => {
        const blob = new Blob(videoChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        try { videoStreamRef.current.getTracks().forEach(t => t.stop()); } catch (err) {}
        videoStreamRef.current = null;
        setVideoRecState('stopped');
      };
      mr.start();
      setVideoRecState('recording');
    } catch (err) {
      console.error('startVideoRecording error', err);
      setVideoRecState('idle');
    }
  }

  function stopVideoRecording() {
    try {
      if (videoRecorderRef.current && videoRecorderRef.current.state === 'recording') {
        videoRecorderRef.current.stop();
      }
    } catch (err) {
      console.error('stopVideoRecording error', err);
    }
  }

  function deleteVideo() {
    if (videoUrl) {
      try { URL.revokeObjectURL(videoUrl); } catch (err) {}
    }
    setVideoUrl(null);
    setVideoRecState('idle');
  }

  useEffect(() => {
    return () => {
      // cleanup audio
      try {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') mediaRecorderRef.current.stop();
        if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop());
        if (mediaUrl) URL.revokeObjectURL(mediaUrl);
      } catch (err) {}
      // cleanup camera
      try { if (cameraStream) cameraStream.getTracks().forEach(t => t.stop()); } catch (err) {}
      try { if (photoUrl) URL.revokeObjectURL(photoUrl); } catch (err) {}
      // cleanup video
      try {
        if (videoRecorderRef.current && videoRecorderRef.current.state === 'recording') videoRecorderRef.current.stop();
        if (videoStreamRef.current) videoStreamRef.current.getTracks().forEach(t => t.stop());
        if (videoUrl) URL.revokeObjectURL(videoUrl);
      } catch (err) {}
    };
  }, [mediaUrl, cameraStream, photoUrl, videoUrl]);

  return (
    <main className="w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 py-8 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="bg-white/60 backdrop-blur-md p-6 rounded-xl border border-white/50 shadow-sm">
          <h1 className="text-3xl font-extrabold text-rose-700">Emergency Toolkit</h1>
          <p className="mt-2 text-sm text-slate-600">quick emergency tools for location sharing and evidence capture</p>
        </header>

        <section className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Location card */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow">
            <h2 className="text-xl font-semibold text-rose-700">Live Location Share</h2>
            <p className="mt-1 text-sm text-slate-600">Share your current location quickly with helpers.</p>

            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <button onClick={getLocation} className="inline-flex items-center px-4 py-2 rounded-full bg-violet-100 text-violet-800 hover:bg-violet-200 transition">Get My Location</button>
                <button onClick={clearLocation} className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-rose-800 hover:bg-rose-200 transition">Clear</button>
              </div>

              <div className="text-sm text-slate-700">{locationStatus}</div>

              {mapsLink && (
                <div className="mt-3 flex flex-col space-y-2">
                  <a href={mapsLink} target="_blank" rel="noreferrer" className="text-rose-600 font-medium hover:underline">Open location in Google Maps</a>
                  <div className="flex items-center gap-2">
                    <button onClick={copyLink} className="px-3 py-1 rounded-md bg-white text-slate-700 border">Copy link</button>
                    <button onClick={shareWhatsApp} className="px-3 py-1 rounded-md bg-green-100 text-emerald-700 border">Share via WhatsApp</button>
                  </div>
                  <div className="text-xs text-slate-500">Latitude: {coords?.latitude?.toFixed(6)} &nbsp; Longitude: {coords?.longitude?.toFixed(6)}</div>
                </div>
              )}
            </div>
          </div>

          {/* Audio recording card */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow">
            <h2 className="text-xl font-semibold text-rose-700">Audio Recording</h2>
            <p className="mt-1 text-sm text-slate-600">Record audio evidence quickly on your device.</p>

            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <button onClick={startRecording} disabled={recState === 'recording'} className="px-4 py-2 rounded-full bg-violet-100 text-violet-800 hover:bg-violet-200 transition">Start Recording</button>
                <button onClick={stopRecording} disabled={recState !== 'recording'} className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition">Stop Recording</button>
                <button onClick={deleteRecording} disabled={!mediaUrl && recState === 'idle'} className="px-4 py-2 rounded-full bg-red-100 text-rose-800 hover:bg-rose-200 transition">Delete</button>
              </div>

              <div className="text-sm text-slate-700">Status: {recState}</div>

              {mediaUrl && (
                <div className="mt-3 flex items-center gap-3">
                  <audio controls src={mediaUrl} className="rounded" />
                  <a href={mediaUrl} download={`recording-${Date.now()}.webm`} className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 border">Download</a>
                </div>
              )}
            </div>
          </div>

          {/* Photo capture card */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow">
            <h2 className="text-xl font-semibold text-rose-700">Quick Photo Capture</h2>
            <p className="mt-1 text-sm text-slate-600">Snap a quick photo using your device camera.</p>

            <div className="mt-4 space-y-3">
              {!photoUrl ? (
                <div className="space-y-2">
                  <div className="w-full h-48 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
                    <video ref={videoRef} className="w-full h-full object-cover" autoPlay playsInline muted />
                  </div>

                  <div className="flex gap-3">
                    {!cameraStream ? (
                      <button onClick={startCamera} className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">Start Camera</button>
                    ) : (
                      <button onClick={capturePhoto} className="px-4 py-2 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition">Capture</button>
                    )}
                    {cameraStream && (
                      <button onClick={stopCamera} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Stop Camera</button>
                    )}
                    {photoUrl && (
                      <button onClick={deletePhoto} className="px-4 py-2 rounded-full bg-red-100 text-rose-800 hover:bg-rose-200 transition">Delete</button>
                    )}
                  </div>

                  {cameraError && <div className="text-xs text-red-600">{cameraError}</div>}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-full h-48 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
                    <img src={photoUrl} alt="captured" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex gap-3">
                    <a href={photoUrl} download={`photo-${Date.now()}.jpg`} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Download</a>
                    <button onClick={() => { deletePhoto(); }} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Retake</button>
                  </div>
                </div>
              )}

              <canvas ref={photoCanvasRef} style={{ display: 'none' }} />
            </div>
          </div>

          {/* Video recording card */}
          <div className="bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 p-6 shadow">
            <h2 className="text-xl font-semibold text-rose-700">Video Recording</h2>
            <p className="mt-1 text-sm text-slate-600">Record short video evidence on your device.</p>

            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <button onClick={startVideoRecording} disabled={videoRecState === 'recording'} className="px-4 py-2 rounded-full bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition">Start Video</button>
                <button onClick={stopVideoRecording} disabled={videoRecState !== 'recording'} className="px-4 py-2 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-200 transition">Stop Video</button>
                <button onClick={deleteVideo} disabled={!videoUrl && videoRecState === 'idle'} className="px-4 py-2 rounded-full bg-red-100 text-rose-800 hover:bg-rose-200 transition">Delete</button>
              </div>

              <div className="text-sm text-slate-700">Status: {videoRecState}</div>

              {videoUrl && (
                <div className="mt-3 flex flex-col gap-3">
                  <video controls src={videoUrl} className="rounded w-full max-h-64 object-cover" />
                  <div className="flex gap-2">
                    <a href={videoUrl} download={`video-${Date.now()}.webm`} className="px-3 py-1 rounded-md bg-slate-100 text-slate-700 border">Download</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
