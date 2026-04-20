import React from 'react';
import { emergencyGuides } from '../data/emergencyGuides';

function cardClassById(id) {
  switch (id) {
    case 'women-safety':
      return 'bg-gradient-to-br from-rose-50 to-pink-50 border-white/40 text-rose-700';
    case 'child-safety':
      return 'bg-gradient-to-br from-blue-50 to-sky-50 border-white/40 text-sky-700';
    case 'medical':
      return 'bg-gradient-to-br from-emerald-50 to-teal-50 border-white/40 text-emerald-700';
    case 'fire':
      return 'bg-gradient-to-br from-orange-50 to-amber-50 border-white/40 text-amber-700';
    case 'police':
      return 'bg-gradient-to-br from-indigo-50 to-violet-50 border-white/40 text-violet-700';
    case 'disaster':
      return 'bg-gradient-to-br from-rose-50 to-lime-50 border-white/40 text-lime-700';
    default:
      return 'bg-white border-slate-100 text-slate-900';
  }
}

export default function GuidesPage() {
  return (
  <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-rose-700">Safety Guides</h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl">Practical, concise steps you can follow during common emergencies. Follow these calm, focused instructions to act quickly and safely.</p>
        </header>

        <section className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {emergencyGuides.map((guide) => {
              const style = cardClassById(guide.id);
              return (
                <article
                  key={guide.id}
                  className={`${style} p-5 rounded-2xl shadow-sm hover:shadow-md transition transform hover:-translate-y-0.5 border`}>
                  <h2 className={`text-lg md:text-xl font-semibold ${style.includes('text-') ? style.split(' ').find(c=>c.startsWith('text-')) : 'text-slate-900'}`}>{guide.title}</h2>
                  <p className="mt-2 text-base md:text-lg text-slate-700">{guide.summary}</p>

                  <ol className="mt-4 list-decimal list-inside text-base md:text-base text-slate-700 space-y-3 leading-relaxed">
                    {guide.steps.map((s, idx) => (
                      <li key={idx} className="pl-1">{s}</li>
                    ))}
                  </ol>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
