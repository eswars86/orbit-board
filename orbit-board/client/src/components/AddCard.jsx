import React, { useState } from 'react';
import * as api from '../api.js';

export default function AddCard({ boardId, columnId, onAdded }) {
  const [title, setTitle] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleAdd(e) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    setBusy(true);
    try {
      await api.addCard(boardId, columnId, { title: trimmed });
      setTitle('');
      onAdded();
    } catch (err) {
      // Keep it simple — surface via console for now.
      // TODO: show an inline error toast.
      console.error('Failed to add card:', err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="add-card" onSubmit={handleAdd}>
      <input
        type="text"
        placeholder="+ Add a card…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={busy}>
        {busy ? 'Adding…' : 'Add card'}
      </button>
    </form>
  );
}
