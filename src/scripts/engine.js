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
        computer: document.getElementById("computer-field-card")
    },

    actions: {
        button: document.getElementById("next-duel"),
    },

    playerSides: {
        player1: "player-cards",
        player1Box: document.querySelectorAll("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelectorAll("#computer-cards"),
    
    },
    
}

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards"
}
//enumeracão de cartas - para dar sentido, facilitar acesso
const pathImages = "./src/assets/icons/";
const cardData = [
    {id: 0,
    name: "Blue Eyes White Dragon",
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
    name: "Exodia",
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

async function createCardImage(IdCard, fieldSide){
    const cardImage = document.createElement("img");
    //("campo qualificado", "valor")
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

    //sorteia carta aleatória para o computador
    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);

    await hiddenCardDetails();


    await drawCardsInField(cardId, computerCardId);

    //checa o resultado comparando uma carta (o id de uma a outra)
    let duelResults = await checkDuelResults(cardId, computerCardId);


    //para atualizar a pontuacão
    await updateScore();

    //para desenhar o meu botão de acordo com o resultado
    await drawButton(duelResults);

}

async function drawCardsInField(cardId, computerCardId){
    //seta as imagens
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value){
    if(value === true){
    //muda para display block
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }

    if(value === false){
        //muda para display block
            state.fieldCards.player.style.display = "none";
            state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardDetails(){
    
    state.cardSprite.avatar.src = "";
    state.cardSprite.name.innerText = "";
    state.cardSprite.type.innerText = "";
}

//altera a pontuacão visualmente
async function updateScore(){
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function drawButton(text){
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

//para mudar a pontuacão
async function checkDuelResults(playerCardId, computerCardId){
    let duelResults = "draw";
    let playerCard = cardData[playerCardId];

    if(playerCard.winOf.includes(computerCardId)){
        duelResults = "win";
        state.score.playerScore++;
    }

    if(playerCard.loseOf.includes(computerCardId)){
        duelResults = "lose"
        state.score.computerScore++;
    }

    await playAudio(duelResults)
    return duelResults;
}

//funcão para remover todas as imagens dos dois lados do campo
async function removeAllCardsImages(){
    //recuperar cards da memória
    let {computerBox, player1Box} = state.playerSides
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());

    imgElements = player1Box.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
}

/**
 * Atualiza as informações e a imagem da carta selecionada no estado da aplicação.
 * @param {number} index - O índice da carta no array de dados das cartas.
 */

async function drawSelectCard(index){
    state.cardSprite.avatar.src = cardData[index].img;
    state.cardSprite.name.innerText = cardData[index].name;
    state.cardSprite.type.innerText = "Atribute: " + cardData[index].type;
}

//primeiro pensar na lógica, depois pensar no motor(funcão)
async function drawCards(cardNumbers, fieldSide) {
    for(let i = 0; i < cardNumbers; i++){
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage)
    }
}
//para zerar a pontuacão
async function resetDuel(){
    state.cardSprite.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function playAudio(status){
    const audio = new Audio(`./src/assets/audio/${status}.wav`);
    try {
        audio.play();
    } catch (error) {
        console.error("Erro ao reproduzir áudio:", error.message);
    }
    
}

function init(){

    showHiddenCardFieldsImages(false);

    drawCards(5, playerSides.player1);
    drawCards(5, playerSides.computer);

    const bgm = document.getElementById("bgm");
    bgm.play();     

}

init();