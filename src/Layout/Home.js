import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteDeck, listDecks } from '../utils/api';
import "./Home.css";

function Home() {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
      listDecks()
      .then(setDecks);
    }, []);

    const handleDelete = id => {
      
      if(id && window.confirm("Delte this Deck?\n\n You will not be able to recover it.")){
        deleteDeck(id)
        .then(() => {
          listDecks()
          .then(setDecks);
        });
      }
    };
    
    return (
      <section>
        <div className='create-deck-container d-flex justify-content-between align-items-center'>
          <Link to="/decks/new">
            <button className='btn btn-secondary'>+ Create Deck</button>
          </Link>
        </div>
        <br />
        <div className='decks-container'>
          <ul className='decks-list'>
            {decks.map((deck, index) => (
              <ol className='deck-container mb-3 boarder border-dark' key={index}>
                <div className='deck-header'>
                    <h3 className='text-left align-middle'>{deck.name}</h3>
                    <p className='text-right mr-2 text-muted align-middle'>{deck.cards.length} cards</p>                  
                </div>
                <div className='deck-description'>
                  <p>{deck.description}</p>
                </div>
                <div className='deck-buttons mb-1'>
                  <Link to={`/decks/${deck.id}`} className="btn btn-secondary mr-2">
                    View
                  </Link>
                  <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
                    Study
                  </Link>
                  <button 
                    onClick={() => handleDelete(deck.id)} 
                    className='btn btn-danger float-right mr-2'
                  >Delte deck</button>
                </div>
              </ol>
            ))}
          </ul>
        </div>
      </section>
    );
}

export default Home;