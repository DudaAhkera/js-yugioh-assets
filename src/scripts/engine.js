const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprite: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type")
    },
    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
        button: document.getElementById("next-duel"),
    },
    
}

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",

}
const pathImages = "./src/assets/icons/";
const cardData = [
    {id: 0,
    name: "Blue eyes White Dragon",
    type: "Paper",
    img: `${pathImages}dragon.png`,
    winOf:[1],
    LoseOf: [2]
    },

    {id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf:[2],
        LoseOf: [0]
        } ,
    
    {id: 2,
    name: "Exidia",
    type: "Scissors",
    img: `${pathImages}exodia.png`,
    winOf:[0],
    LoseOf: [1]
    } 

]

async function getRandomCardId(){
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id
}

async function createCardImage(randomIdCard, fieldSide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", IdCard);
    cardImage.classList.add("card");

    if(fieldSide === playerSides.player1){
        cardImage.addEventListener("mouseover", ()=>{
            drawSelectCard(IdCard);
        });
        
        cardImage.addEventListener("click", ()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        
        });


    }

    return cardImage;
}

async function setCardsField(cardId) {

    //remove todas as cartas antes
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();
    state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";

    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await 
}

async function drawSelectCard(index){
    state.cardSprite.avatar.src = cardData[index].img;
    state.cardSprite.name.innerText = cardData[index].name;
    state.cardSprite.type.innerText = "Atribute: " + cardData[index].type;
}

async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage)
    }
}

function init(){
    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

}

init();