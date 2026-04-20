import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { emergencyCategories } from '../data/emergencyCategories';

export default function CategoryPage() {
	const { id } = useParams();
	const category = emergencyCategories.find((c) => c.id === id);

	// Determine nearby help mapping and primary quick-call number
	const nearbyMapQueries = {
		'medical': { label: 'Find Nearby Hospitals', query: 'hospitals near me' },
		'child-safety': { label: 'Find Nearby Police Station', query: 'police station near me' },
		'women-safety': { label: 'Find Nearby Police Help', query: 'police station near me' },
		'fire': { label: 'Find Nearby Fire Station', query: 'fire station near me' },
		'police': { label: 'Find Nearby Police Station', query: 'police station near me' },
		'disaster': { label: 'Find Nearby Emergency Services', query: 'emergency services near me' },
	};

	// If a category should prefer a specific label for the quick-call button, list it here
	const primaryOverrideLabel = {
		'women-safety': 'Women Helpline',
	};

	function findPrimaryNumber(cat) {
		if (!cat?.emergencyNumbers || !cat.emergencyNumbers.length) return null;

		// If there's an override label for this category, prefer that first
		if (primaryOverrideLabel[cat.id]) {
			const byLabel = cat.emergencyNumbers.find((n) => n.label.toLowerCase() === primaryOverrideLabel[cat.id].toLowerCase());
			if (byLabel) return byLabel;
		}

		// Prefer an entry that mentions 'Emergency' or 'Police' or 'Ambulance' or 'Fire'
		const preferred = cat.emergencyNumbers.find((n) => /Emergency|Police|Ambulance|Fire/i.test(n.label));
		return preferred || cat.emergencyNumbers[0];
	}

	const nearby = nearbyMapQueries[category?.id] || { label: 'Find Nearby Help', query: 'emergency services near me' };
	const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(nearby.query)}`;
	const primary = findPrimaryNumber(category);
	const primaryNumber = primary?.phone || '';
	const primaryLabel = primary?.label || 'Emergency';

	if (!category) {
		return (
			<main className="min-h-screen flex items-center justify-center w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 p-6">
				<div className="max-w-xl text-center">
					<h1 className="text-2xl font-bold text-slate-900">Category not found</h1>
					<p className="mt-2 text-sm text-slate-600">The requested category does not exist.</p>
					<div className="mt-4">
						<Link to="/dashboard" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Back to Dashboard</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 py-10 px-4">
			<div className="max-w-4xl mx-auto">
				<header>
					<h1 className="text-2xl sm:text-3xl font-bold text-rose-700">{category.title}</h1>
					<p className="mt-2 text-sm text-slate-600 max-w-2xl">{category.description}</p>
				</header>

				<section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Emergency Numbers</h2>
						<ul className="mt-3 space-y-4 text-base text-slate-800">
							{category.emergencyNumbers.map((n, idx) => (
								<li key={idx} className="flex items-center justify-between">
									<span className="font-semibold text-base md:text-lg text-emerald-700">{n.label}</span>
									<span className="text-violet-700 font-extrabold md:text-lg">{n.phone}</span>
								</li>
							))}
						</ul>
					</div>

					<div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
						<h2 className="text-lg font-semibold text-slate-900">Find Nearby Help</h2>
						<p className="mt-2 text-sm text-slate-600">Quick local help and actions you can use right now.</p>

						<div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-3">
							<a
								href={mapsUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center px-4 py-2 bg-sky-100 text-sky-800 rounded-full shadow-sm hover:bg-sky-200"
							>
								{nearby.label}
							</a>

							{primaryNumber && (
								<a
									href={`tel:${primaryNumber}`}
									className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full shadow-sm hover:bg-emerald-200"
								>
									Call {primaryLabel}
								</a>
							)}
						</div>
					</div>
				</section>

				<div className="mt-6">
					<Link to="/dashboard" className="inline-flex items-center px-4 py-2 bg-rose-100 text-rose-700 rounded-full shadow-sm hover:bg-rose-200">← Back to Dashboard</Link>
				</div>
			</div>
		</main>
	);
}
