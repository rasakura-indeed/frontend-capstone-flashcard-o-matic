import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams} from 'react-router-dom';
import { readDeck, deleteDeck, deleteCard } from '../utils/api';

function Deck() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const {deckId} = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    readDeck(deckId)
    .then(result => {
      setDeck(result);
      setCards(result.cards);
    });
  }, [deckId]);

  useEffect(() => {

  }, )

  const handleDelete = id => {
    if(id && window.confirm("Delte this Deck?\n\n You will not be able to recover it.")){
      deleteDeck(id)
      .then(() => {
        navigate('/');
      });
    }
  };

  const handleDeleteCard = id => {
    if (id && window.confirm("Delte this card?\n\n You will not be able to recover it.")) {
      deleteCard(id)
      .then(() => readDeck(deckId))
      .then(result => {
        setCards(result.cards)
      })
    }
  }

  return (
    <>
      <nav aria-label="breadcrumb mt-4" >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <section className='deck-info'>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div className='deck-buttons'>
          <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
            Edit
          </Link>
          <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
            Study
          </Link>
          <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
            Add Cards
          </Link>
          <button className='btn btn-danger ml-2 float-right' onClick={() => handleDelete(deck.id)}>Delete deck</button>
        </div>
      </section>
      <section className='cards-info'>
        <h2>Cards</h2>
        {cards.map((card, index) => (
          <div key={index} className='card mb-2'>
            <div className="card-body">
            <p className="card-text"><strong>Front:</strong> {card.front}</p>
            <p className="card-text"><strong>Back:</strong> {card.back}</p>
            <div className='float-right'>
              <Link to={`/decks/${deckId}/cards/${card.id}/edit`} className="btn btn-secondary mr-2">Edit</Link>
              <button onClick={() => handleDeleteCard(card.id)} className="btn btn-danger">Delete</button>
            </div>
          </div>
          </div>
        ))}
      </section>
      
    </>
  );
}

export default Deck;