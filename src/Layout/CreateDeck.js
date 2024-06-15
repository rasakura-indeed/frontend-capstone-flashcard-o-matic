import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createDeck } from '../utils/api';

function CreateDeck() {
  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({...initialFormState});
  const navigate = useNavigate();

  const hadnleSubmit = async (event) => {
    event.preventDefault();
    const result = await createDeck(formData);
    navigate(`/decks/${result.id}`);
  };

  const handleChange = ({target}) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    navigate('/')
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={hadnleSubmit}>
        <div className='form-container'>
          <label htmlFor='name'>
            Name
            <br />
            <input
              id='name'
              type='text'
              name='name'
              onChange={handleChange}
              value={formData.name}
              placeholder='Deck name'
            />
          </label>
          <br />
          <label htmlFor='description'>
            Description
            <br />
            <textarea
              id='description'
              name='description'
              type='text'
              onChange={handleChange}
              value={formData.description}
              placeholder='Brief descrition of the deck'
            />
          </label>
          <div className='form-buttons'>
            <button type='cancel' onClick={handleCancel} className='btn btn-secondary mr-2'>Cancel</button>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateDeck;