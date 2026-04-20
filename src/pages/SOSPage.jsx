import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ContactForm from '../components/ContactForm';
import {
  addSOSContact,
  getUserSOSContacts,
  updateSOSContact,
  deleteSOSContact,
} from '../services/contactService';

export default function SOSPage() {
  const { currentUser } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Form state
  const [selectedContact, setSelectedContact] = useState(null); // null => add mode
  const [formLoading, setFormLoading] = useState(false);

  async function fetchContacts() {
    if (!currentUser?.uid) return;
    setLoading(true);
    setError('');
    try {
      const items = await getUserSOSContacts(currentUser.uid);
      setContacts(items || []);
    } catch (err) {
      setError(err?.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.uid]);

  async function handleAdd(data) {
    if (!currentUser?.uid) return;
    setFormLoading(true);
    setError('');
    try {
      await addSOSContact({ userId: currentUser.uid, ...data });
      setSelectedContact(null);
      await fetchContacts();
    } catch (err) {
      setError(err?.message || 'Failed to add contact');
    } finally {
      setFormLoading(false);
    }
  }

  async function handleUpdate(data) {
    if (!selectedContact?.id) return;
    setFormLoading(true);
    setError('');
    try {
      await updateSOSContact(currentUser.uid, selectedContact.id, data);
      setSelectedContact(null);
      await fetchContacts();
    } catch (err) {
      setError(err?.message || 'Failed to update contact');
    } finally {
      setFormLoading(false);
    }
  }

  async function handleDelete(contactId) {
    const ok = window.confirm('Are you sure you want to delete this contact?');
    if (!ok) return;
    setError('');
    try {
      await deleteSOSContact(currentUser.uid, contactId);
      await fetchContacts();
    } catch (err) {
      setError(err?.message || 'Failed to delete contact');
    }
  }

  if (!currentUser) {
    return (
      <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 flex items-center justify-center px-4">
        <p className="text-slate-700">Please sign in to manage your SOS contacts.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-rose-50 via-white to-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-rose-700">SOS Contacts</h1>
          <p className="mt-1 text-sm text-slate-600">Add and manage your personal emergency contacts for quick SOS alerts.</p>
        </header>

        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h2 className="text-lg font-medium text-slate-900">{selectedContact ? 'Edit contact' : 'Add contact'}</h2>
                <p className="text-sm text-slate-600 mt-1">{selectedContact ? 'Update details and save.' : 'Add a new SOS contact.'}</p>

                <div className="mt-4">
                  <ContactForm
                    initialData={selectedContact || {}}
                    onSubmit={selectedContact ? handleUpdate : handleAdd}
                    onCancel={() => setSelectedContact(null)}
                    loading={formLoading}
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-slate-900">Your contacts</h2>
                <div className="text-sm text-slate-600">{loading ? 'Loading…' : `${contacts.length} saved`}</div>
              </div>

              {error && <div className="mt-3 text-sm text-rose-700">{error}</div>}

              <div className="mt-4">
                {loading ? (
                  <div className="text-slate-600">Loading contacts…</div>
                ) : contacts.length === 0 ? (
                  <div className="p-6 bg-white rounded-xl border border-slate-100 shadow-sm text-slate-700">You have no SOS contacts yet. Use the form to add one.</div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {contacts.map((c) => (
                      <article key={c.id} className="p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-900">{c.name}</h3>
                            <p className="text-sm text-slate-600">{c.relation} • {c.priority}</p>
                          </div>

                          <div className="flex items-center gap-3">
                            {c.phone ? (
                              <a
                                href={`tel:${c.phone}`}
                                className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                                aria-label={`Call ${c.name}`}
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h2.2a2 2 0 011.8 1.1l.9 1.8a2 2 0 01-.45 2.2l-1.2 1.2a11 11 0 005.2 5.2l1.2-1.2a2 2 0 012.2-.45l1.8.9A2 2 0 0121 18.8V21a2 2 0 01-2 2h-0C9.163 23 1 14.837 1 3v0z" />
                                </svg>
                              </a>
                            ) : null}

                            <button
                              onClick={() => setSelectedContact(c)}
                              className="text-sm text-indigo-600 hover:underline font-medium"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(c.id)}
                              className="text-sm text-rose-600 hover:underline font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </div>

                        <div className="mt-3 text-sm text-slate-700">{c.phone}</div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
