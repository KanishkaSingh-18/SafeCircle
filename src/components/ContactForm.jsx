import React, { useState, useEffect } from 'react';

export default function ContactForm({ initialData = {}, onSubmit, onCancel, loading = false }) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [error, setError] = useState('');

  useEffect(() => {
    setName(initialData.name || '');
    setRelation(initialData.relation || '');
    setPhone(initialData.phone || '');
    setPriority(initialData.priority || 'Normal');
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!name.trim()) return setError('Name is required');
    if (!phone.trim()) return setError('Phone is required');

    const payload = { name: name.trim(), relation: relation.trim(), phone: phone.trim(), priority };
    try {
      onSubmit(payload);
    } catch (err) {
      setError(err?.message || 'Submit failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && <div className="text-sm text-rose-700">{error}</div>}

      <div>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Relation</label>
        <input value={relation} onChange={(e) => setRelation(e.target.value)} className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2" placeholder="e.g. Friend, Family" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Phone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2" placeholder="e.g. +1234567890" />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="mt-1 block w-full rounded-md border border-slate-200 px-3 py-2">
          <option>Normal</option>
          <option>High</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={loading} className="px-4 py-2 rounded-full bg-rose-100 text-rose-800 hover:bg-rose-200 transition disabled:opacity-50">
          {loading ? 'Saving…' : (initialData && initialData.id ? 'Update' : 'Save')}
        </button>
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition">Cancel</button>
      </div>
    </form>
  );
}
