import express from 'express';
import cors from 'cors';

import {
    shuffleArray,
    cards,
} from './controller/controller'

const app = express();
app.use(cors());
const port = 4000 || process.env.port;

let shuffeldCards = shuffleArray(cards);
let selectedCard = null;
let gameOver = false;
let compare = true;

app.get('/', (req, res) => {
    res.json(shuffeldCards)
})

app.get('/card/:index', (req, res) => {
    const {
        index
    } = req.params;

    res.json(shuffeldCards[parseInt(index)])
})

app.get('/startGame', (req, res) => {
    res.json({shuffeldCards})
})

app.get('/checkIfGameOver/', (req, res) => {
    if (!gameOver) {
        if (shuffeldCards.every((card) => card.isDone)) {
            gameOver = true;
        }
    }
    res.json({ gameOver })
})

app.get('/handleCardClick/:index', (req, res, next) => {
    const index = parseInt(req.params.index);

    if (shuffeldCards[index].isFliped) { res.sendStatus(200) }

    shuffeldCards = shuffeldCards.map((card, i) => {
        /// filp selected card
        if (i === index) {
            return {
                ...card,
                isFliped: true,
            };
        }
        return card;
    })
    /// update state selectedCard
    if (!selectedCard) {
        selectedCard = shuffeldCards[index];
        compare = true;
    } else { /// check card with selectedCard
        console.log("first card is: ",selectedCard)
        console.log("second card is: ", shuffeldCards[index])
        if (shuffeldCards[index].color !== selectedCard.color) { //if not compare
            const updateCards = shuffeldCards.map((card, i) => {
                if (i === index || card.color === selectedCard.color) {
                    return {
                        ...card,
                        isFliped: false,
                    };
                }
                return card;
            })
            selectedCard = null;
            shuffeldCards = updateCards;
            compare = false;
        } else { //if compare

            const updateCards = shuffeldCards.map((card, i) => {
                if (i === index || card.color === selectedCard.color) {
                    return {
                        ...card,
                        isDone: true,
                    };
                }
                return card;
            })


            shuffeldCards = updateCards;
            selectedCard = null;

            if (!gameOver && shuffeldCards.every((card) => card.isDone)) {
                gameOver = true;
            }
        }
    }

    res.json({ cards: shuffeldCards, compare: compare, gameOver: gameOver })
})



app.listen(port, () => console.log('Server ready'))
