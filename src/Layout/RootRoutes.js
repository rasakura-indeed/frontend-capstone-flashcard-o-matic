import React from 'react'
import { Routes, Route } from "react-router-dom";
import  NotFound from "./NotFound";
import Home from './Home';
import CreateDeck from './CreateDeck';
import Deck from './Deck';
import EditDeck from './EditDeck';
import Study from './Study';
import EditCard from './EditCard';
import AddCard from './AddCard';


function RootRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/decks/new" element={<CreateDeck />} />
        <Route path="/decks/:deckId" element={<Deck />} />
        <Route path="/decks/:deckId/edit" element={<EditDeck />} />
        <Route path="/decks/:deckId/study" element={<Study />} />
        <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
        <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} /> 
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default RootRoutes;