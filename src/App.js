import {useState, useEffect} from "react";
import axios from "axios";
import Card from "./Card";

/** App: 
 * 
 * Props:
 * - 
 *
 * State:
 * - 
 *
 * App ->  
 */ 



function App() {
    

    const deckAPI = "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
    const cardAPIBase = "http://deckofcardsapi.com/api/deck/";

    const [deck, setDeck] = useState(null);
    const [drawingCard, setDrawingCard] = useState(false);

    console.log("<APP>, state:", deck, drawingCard);

    async function fetchDeck(){
        const deckRes = await axios.get(deckAPI);
        setDeck(deckRes.data);
    };

    async function drawCard(){
        const cardRes = await axios.get(`${cardAPIBase}/${deck.deck_id}/draw/?count=1`);
        setDeck(deck => {return {
            ...deck,
            remaining:cardRes.data.remaining,
            recentCard:cardRes.data.cards[0]
        }} )
    }
    //what we're doing here is spreading the existing deck, 
    //then spreading the draw new card obj 
    //which has a lot of duplicate properties
    //to update the properties in deck and update state 
    //TODO: ask about why we need the {} around the return
    //TODO: update notes for setDeck change
    
    useEffect(function fetchDeckOnLoad() {
        fetchDeck();
    }, [ ]);

    useEffect(function drawOneCard(){
        if (deck !== null && deck.remaining > 0){
            drawCard();
            setDrawingCard(false);
        }
        
    }, [drawingCard]);

    if(!deck){
        return <p>loading...</p>
    };

    function handleClick(){
        setDrawingCard(true);
    };

    return (
        <div>
            {deck.remaining === 0 &&
                <div style="background-color:tomato,color:white">No cards left!</div>
            }
            <button onClick={handleClick}>Draw 1 Card</button>
            {deck.recentCard !== undefined &&
                <Card face={deck.recentCard.image} />
            }
        </div>
    );


}

export default App;