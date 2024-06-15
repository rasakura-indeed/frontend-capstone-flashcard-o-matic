import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { readDeck } from '../utils/api';
import CardForm from './CardForm';

function AddCard() {
  const [deck, setDeck] = useState({});
  const {deckId} = useParams();

  useEffect(() => {
    readDeck(deckId)
    .then(result => {
      setDeck(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [deckId]);

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <CardForm
        deckId={deckId}
        isNew={true}
      />
    </>
  );
}

export default AddCard;