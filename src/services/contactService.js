import { db } from './firebase';
import {
	collection,
	addDoc,
	query,
	where,
	orderBy,
	getDocs,
	doc,
	updateDoc,
	deleteDoc,
	serverTimestamp,
} from 'firebase/firestore';

// New structure: store sos contacts under users/{uid}/sosContacts/{contactId}
// This aligns with typical owner-scoped Firestore security rules.

export async function addSOSContact(contactData) {
	if (!contactData?.userId) throw new Error('Missing userId for contact');
	const payload = {
		name: contactData.name,
		relation: contactData.relation,
		phone: contactData.phone,
		priority: contactData.priority || 'Normal',
		createdAt: serverTimestamp(),
	};

	// collection: users/{uid}/sosContacts
	const ref = collection(db, 'users', contactData.userId, 'sosContacts');
	const result = await addDoc(ref, payload);
	return { id: result.id, userId: contactData.userId, ...payload };
}

export async function getUserSOSContacts(userId) {
	if (!userId) throw new Error('Missing userId');
	const ref = collection(db, 'users', userId, 'sosContacts');
	const q = query(ref, orderBy('createdAt', 'desc'));
	const snap = await getDocs(q);
	const items = [];
	snap.forEach((docSnap) => {
		items.push({ id: docSnap.id, ...docSnap.data() });
	});
	return items;
}

export async function updateSOSContact(userId, contactId, updatedData) {
	if (!userId) throw new Error('Missing userId');
	if (!contactId) throw new Error('Missing contactId');
	const ref = doc(db, 'users', userId, 'sosContacts', contactId);
	const payload = { ...updatedData };
	// Avoid overwriting createdAt unintentionally
	delete payload.createdAt;
	await updateDoc(ref, payload);
	return { id: contactId, ...payload };
}

export async function deleteSOSContact(userId, contactId) {
	if (!userId) throw new Error('Missing userId');
	if (!contactId) throw new Error('Missing contactId');
	const ref = doc(db, 'users', userId, 'sosContacts', contactId);
	await deleteDoc(ref);
	return true;
}

