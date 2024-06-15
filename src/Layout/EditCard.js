import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { readCard, readDeck } from '../utils/api';
import CardForm from './CardForm';


function EditCard() {
  const [card, setCard] = useState({});
  const [deck, setDeck] = useState({});
  const { deckId, cardId } = useParams();

  useEffect(() => {
    readDeck(deckId)
    .then(result => {
      setDeck(result);
    })
    .catch((error) => {
      console.log(error);
    });
  }, [deckId]);

  useEffect(() => {
    readCard(cardId)
    .then(setCard)
    .catch((error) => {
      console.log(error);
    });
  }, [cardId])

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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <CardForm
        deckId={deckId}
        card={card}
        isNew={false}
      />
    </>
  );
}

export default EditCard;