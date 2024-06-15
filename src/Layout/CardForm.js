import React, { useState } from 'react';
import { createCard, updateCard } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function CardForm({ deckId, card = {front: '', back: ''}, isNew }) {
  const [cardData, setCardData] = useState({...card});
  const navigate = useNavigate();
  const handleChange = ({target}) => {
    setCardData({
      ...cardData,
      [target.name]: target.value
    });
  };

  useEffect(() => {
    if(!isNew) {
      setCardData({...card});
    }
  }, [card, isNew])

  const hadnleSubmit = async (event) => {
    event.preventDefault();
    if(isNew) {
      await createCard(deckId, cardData);
      setCardData({...card});
    } else{
      await updateCard(cardData);
      navigate(`/decks/${deckId}`)
    }
  }

  const handleCancel = () => navigate(`/decks/${deckId}`);

  return (
    <>
      <form onSubmit={hadnleSubmit}>
          <div className='form-container'>
            <label htmlFor='front'>
              Front
              <br />
              <textarea
                id='front'
                type='text'
                name='front'
                onChange={handleChange}
                value={cardData.front}
                placeholder='Front side of card'
              />
            </label>
            <br />
            <label htmlFor='back'>
              Back
              <br />
              <textarea
                id='back'
                name='back'
                type='text'
                onChange={handleChange}
                value={cardData.back}
                placeholder='Back side of card'
              />
            </label>
            <div className='form-buttons'>
              <button type='button' onClick={handleCancel} className='btn btn-secondary mr-2'>{isNew ? 'Done' : 'Cancel'}</button>
              <button type='submit' className='btn btn-primary'>{isNew ? 'Save' : 'Submit'}</button>
            </div>
          </div>
        </form>
    </>
  );
}

export default CardForm;