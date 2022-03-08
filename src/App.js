import {useState, useEffect} from "react";
import {axios} from "axios";

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

    async function fetchDeck(){
        const deckRes = await axios.get(deckAPI);
        setDeck(deckRes.data);
    };

    async function drawCard(){
        const cardRes = await axios.get(`${cardAPIBase}/${deck.deck_id}/draw/?count=1`);
        setDeck(deck => {return {...deck, recentCard:cardRes.data.cards[0]}} )
    }
    //what we're doing here is spreading the existing deck, 
    //then spreading the draw new card obj 
    //which has a lot of duplicate properties
    //to update the properties in deck and update state 
    //TODO: ask about why we need the {} around the return
    //TODO: update notes for setDeck change
    
    function handleClick(){
        setDrawingCard(true);
    };

    useEffect(function fetchDeckOnLoad() {
        fetchDeck();
    }, [ ]);

    useEffect(function drawOneCard(){
        drawCard();
        setDrawingCard(false);
    }, [drawingCard]);


    return (
        <div>
            <button onClick={handleClick}>Draw 1 Card</button>
        </div>
    );


}

export default App;