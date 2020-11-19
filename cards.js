let cardsUrl = "https://deckofcardsapi.com/api/deck";
//get one card
axios.get(`${cardsUrl}/new/shuffle/?deck_count=1`)
  .then(res => {
    console.log("Deck of cards!!")
    console.log(res.data)
    return axios.get(`${cardsUrl}/${res.data.deck_id}/draw/`)
  })
  .then(res => {
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  })
  .catch(err => console.log("REJECTED!!", err))

// Promise all
axios.get(`${cardsUrl}/new/shuffle/?deck_count=1`)
  .then(res => {
    console.log("Deck 2!!")

    let deckId = res.data.deck_id
    let cardPromises =[];
    deckId = res.data.deck_id
    for (let i = 1; i < 3; i++) {
      cardPromises.push(
        axios.get(`${cardsUrl}/${deckId}/draw/`)
      );
    }
   
    Promise.all(cardPromises)
    .then(arr => {
      for(res of arr) {
        console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
      }
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log("REJECTED!!", err))
  


//////////////////////////////////////////////////////////
window.onload = function() {
  let deckId;
  axios.get(`${cardsUrl}/new/shuffle/?deck_count=1`)
  .then(res => {
    console.log("Deck of cards!!")
    console.log(res.data)
    deckId = res.data.deck_id
    return axios.get(`${cardsUrl}/${res.data.deck_id}/draw/`)
  })
  .catch(err => console.log("REJECTED!!", err))

  function drawCard() {
    axios.get(`${cardsUrl}/${deckId}/draw/`)
    .then(res => {
      console.log(res.data)
      console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}, ${res.data.remaining}`)
      document.getElementById("cardImg").src = res.data.cards[0].image
      if (!res.data.remaining) {
        document.getElementById("btn-draw").style.display = 'none';
      }
    })
    .catch(err => console.log("REJECTED!!", err))
  }

  document.getElementById("btn-draw").addEventListener("click", drawCard);
};


