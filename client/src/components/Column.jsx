import React from 'react';
import Card from './Card.jsx';
import AddCard from './AddCard.jsx';

// TODO: wrap this column in a <Droppable> from react-beautiful-dnd to enable
// drag-and-drop between columns. The dependency is installed but not wired up.
export default function Column({ boardId, column, onChanged }) {
  return (
    <section className="column">
      <h2>{column.title}</h2>

      {column.cards.map((card) => (
        <Card
          key={card.id}
          boardId={boardId}
          columnId={column.id}
          card={card}
          onChanged={onChanged}
        />
      ))}

      <AddCard boardId={boardId} columnId={column.id} onAdded={onChanged} />
    </section>
  );
}
