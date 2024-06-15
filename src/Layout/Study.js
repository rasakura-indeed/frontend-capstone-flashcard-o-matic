import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom'
import { readDeck } from '../utils/api';

function Study() {
  const [deck, setDeck] = useState({});
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCardFront, setIsCardFront] = useState(true);
  const { deckId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    readDeck(deckId)
    .then(result => {
      setDeck(result);
      setCards(result.cards)
    })
    .catch((error) => {
      console.log(error);
    });

  }, [deckId]);

  const handletFlip = () => setIsCardFront(!isCardFront);

  const handleNext = () => {
    if (currentIndex + 1 < cards.length) {
      setCurrentIndex(currentIndex + 1);
      setIsCardFront(true);
    } else {
      if(window.confirm(`Restart cards? Click 'cancel' to return to home page.`)) {
        setCurrentIndex(0);
        setIsCardFront(true);
      } else {
        navigate('/');
      }
    }
  };


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
            Study
          </li>
        </ol>
      </nav>
      <div>
        <h2>Study: {deck.name}</h2>
        <div className='card'>
          {cards.length >= 3 ? (
            <div className='card-body'>
              <h4 className="card-title">
                Card {currentIndex + 1} of {cards.length}{' '}
              </h4>
              <p className="card-text">
                {isCardFront
                  ? `${cards[currentIndex].front}`
                  : `${cards[currentIndex].back}`}
              </p>
              <button onClick={handletFlip} className='btn btn-secondary mr-2'>Flip</button>
              {isCardFront ? null : <button onClick={handleNext} className='btn btn-primary'>Next</button>}
            </div>
          ) : (
            <div className="card-body">
              <h4 className="card-title">Not Enough Cards</h4>
              <p className="card-text">You need at least 3 cards to study. There are {cards.length} cards in this deck. </p>
              <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Study;