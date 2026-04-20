import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from '../assets/ChatGPT Image Apr 19, 2026, 03_59_49 PM.png';

export default function Home() {
    return (
    <main className="w-full overflow-x-hidden bg-gradient-to-br from-rose-50 via-white to-slate-50">
            <div className="relative">
                {/* soft decorative blobs */}
                <div className="absolute -top-12 -left-20 w-60 h-60 bg-rose-100 opacity-24 rounded-full filter blur-3xl pointer-events-none" aria-hidden />
                <div className="absolute -bottom-16 -left-6 w-80 h-80 bg-blue-100 opacity-18 rounded-full filter blur-3xl pointer-events-none" aria-hidden />
                <div className="absolute -bottom-6 -right-12 w-56 h-56 bg-pink-100 opacity-16 rounded-full filter blur-3xl pointer-events-none" aria-hidden />

                <div className="max-w-[1180px] mx-auto px-4 md:px-6 mt-12 md:mt-16 pb-6">
                    {/* HERO CARD */}
                    <section className="w-full bg-white/70 backdrop-blur-md border border-white/50 rounded-[28px] shadow-none px-8 md:px-10 py-8 md:py-10 mb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
                            {/* Left: content */}
                            <div className="flex flex-col justify-center">
                                <h1 className="text-5xl md:text-6xl font-extrabold text-rose-700 tracking-tight leading-none">
                                    SafeCircle
                                </h1>

                                <div className="mt-3 w-44 h-[3px] rounded-full bg-gradient-to-r from-rose-400 via-pink-400 to-rose-300" />

                                <p className="mt-5 text-slate-700 font-semibold text-[20px] md:text-[22px]">
                                    Emergency Help, When Every Second Matters
                                </p>

                                <p className="mt-5 text-slate-600 text-base leading-8 max-w-[500px]">
                                    SafeCircle centralizes quick access to emergency services and
                                    resources, and helps you prepare by managing personal SOS
                                    contacts and safety guides. Get help fast and stay prepared.
                                </p>

                                <div className="mt-8 flex flex-row gap-4">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold shadow-[0_8px_18px_rgba(99,102,241,0.25)]"
                                        aria-label="Login"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-indigo-500 border border-indigo-300 hover:bg-indigo-50 font-semibold"
                                        aria-label="Signup"
                                    >
                                        Signup
                                    </Link>
                                </div>
                            </div>

                            {/* Right: illustration (refined to match reference) */}
                            <div className="flex items-center justify-center relative">
                                {/* large soft circular glow behind */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="w-[320px] h-[320px] md:w-[360px] md:h-[360px] rounded-full bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-80 filter blur-3xl" />
                                </div>

                                {/* dotted decorative ring (subtle) */}
                                <div className="absolute w-[300px] h-[300px] md:w-[340px] md:h-[340px] rounded-full pointer-events-none">
                                    <div className="absolute inset-0 border-2 border-white/30 rounded-full opacity-40" />
                                </div>

                                {/* lower-right pastel wave */}
                                <div className="absolute bottom-0 right-0 w-[320px] h-[120px] bg-gradient-to-r from-pink-100/60 to-blue-100/60 filter blur-2xl rounded-xl" />

                                {/* tiny sparkles */}
                                <div className="absolute -top-8 -right-12 w-2 h-2 bg-rose-200 rounded-full opacity-90" />
                                <div className="absolute -top-4 -left-6 w-2 h-2 bg-blue-200 rounded-full opacity-80" />
                                <div className="absolute bottom-12 right-20 w-2 h-2 bg-pink-200 rounded-full opacity-80" />

                                {/* Illustration image */}
                                <div className="relative z-10 flex items-center justify-center">
                                    <img
                                        src={heroImg}
                                        alt="hero"
                                        className="w-[300px] md:w-[540px] lg:w-[640px] object-contain rounded-xl opacity-95 drop-shadow-[0_24px_60px_rgba(15,23,42,0.12)] relative z-20"
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* WHY SAFECIRCLE section */}
                    <section className="mt-0 rounded-[28px] bg-white/70 backdrop-blur-md border border-white/50 shadow-[0_34px_90px_rgba(15,23,42,0.16)] ring-1 ring-white/60 px-8 md:px-10 py-8 md:py-10">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-rose-300 text-lg">✨</span>
                                <h3 className="text-xl md:text-2xl font-extrabold tracking-wide uppercase">
                                    <span className="text-slate-700">WHY</span>{' '}
                                    <span className="text-rose-600">SAFECIRCLE?</span>
                                </h3>
                            </div>

                            <p className="mt-3 text-slate-600 text-base max-w-3xl">
                                A concise set of tools and resources to help you act quickly in an emergency and prepare ahead of time.
                            </p>

                            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <article className="rounded-[22px] px-4 py-3 min-h-[150px] border border-white/50 shadow-[0_10px_20px_rgba(15,23,42,0.05)] bg-gradient-to-br from-rose-100 to-pink-50">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-white/50 bg-rose-200 text-rose-700">⚡</div>
                                        <h4 className="text-[15px] md:text-lg font-bold text-rose-700 leading-snug">Quick Emergency Access</h4>
                                        <div className="w-10 h-[3px] rounded-full mt-1 mb-2 bg-rose-300" />
                                        <p className="text-slate-600 text-sm leading-7">Fast links to relevant emergency categories so you can reach the right help immediately.</p>
                                    </div>
                                </article>

                                <article className="rounded-[22px] px-4 py-3 min-h-[150px] border border-white/50 shadow-[0_10px_20px_rgba(15,23,42,0.05)] bg-gradient-to-br from-sky-100 to-blue-50">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-white/50 bg-blue-200 text-blue-700">👥</div>
                                        <h4 className="text-[15px] md:text-lg font-bold text-blue-700 leading-snug">Personal SOS Contacts</h4>
                                        <div className="w-10 h-[3px] rounded-full mt-1 mb-2 bg-blue-300" />
                                        <p className="text-slate-600 text-sm leading-7">Save and manage trusted contacts who will be notified during an SOS event.</p>
                                    </div>
                                </article>

                                <article className="rounded-[22px] px-4 py-3 min-h-[150px] border border-white/50 shadow-[0_10px_20px_rgba(15,23,42,0.05)] bg-gradient-to-br from-emerald-100 to-teal-50">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-white/50 bg-emerald-200 text-emerald-700">📄</div>
                                        <h4 className="text-[15px] md:text-lg font-bold text-emerald-700 leading-snug">Emergency Resource Directory</h4>
                                        <div className="w-10 h-[3px] rounded-full mt-1 mb-2 bg-emerald-300" />
                                        <p className="text-slate-600 text-sm leading-7">A curated directory of nearby resources and support services for quick reference.</p>
                                    </div>
                                </article>

                                <article className="rounded-[22px] px-4 py-3 min-h-[150px] border border-white/50 shadow-[0_10px_20px_rgba(15,23,42,0.05)] bg-gradient-to-br from-violet-100 to-purple-50">
                                    <div className="flex flex-col items-start gap-2">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm border border-white/50 bg-violet-200 text-violet-700">💡</div>
                                        <h4 className="text-[15px] md:text-lg font-bold text-violet-700 leading-snug">Safety Guides</h4>
                                        <div className="w-10 h-[3px] rounded-full mt-1 mb-2 bg-violet-300" />
                                        <p className="text-slate-600 text-sm leading-7">Practical, easy-to-follow guides to help you prepare and respond to common emergencies.</p>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
