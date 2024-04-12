import express from "express";
import { GLOBAL_RESET, RANDOM_WORD_OF_THE_DAY } from '../server';

const router = express.Router();

interface IWordleGuessResponse {
    results: ILetterState[],
    correct: boolean,
}

interface ILetterState {
    letter: string,
    state: LetterState,
}

enum LetterState {
    NONE,
    CORRECT_WRONG_POSITION,
    Correct,
}

const checkWord = (guess: string): IWordleGuessResponse => {
    const results = RANDOM_WORD_OF_THE_DAY.trim().split('')
        .map<ILetterState>((x,i) => ({ 
            letter: x,
            state: x === guess[i] ? LetterState.Correct : guess.includes(x) ? LetterState.CORRECT_WRONG_POSITION : LetterState.NONE
        }))

    const correct = results.every(x => x.state === LetterState.Correct)

    return { results, correct }
}

router
    // REMOVE THIS ENDPOINT FOR PRODUCTION
    .get('/word', (req, res) => {
        res.send(RANDOM_WORD_OF_THE_DAY)
    })
    ///////////////////////////////////////
    .get('/wordOfTheDay', (req, res) => {
        res.send({ length: RANDOM_WORD_OF_THE_DAY.length })
    })
    .get('/guess', (req, res) => {
        const { word } = req.query
        if (!word || word.length !== RANDOM_WORD_OF_THE_DAY.length) {
            res.status(400).send({ error: 'Invalid word' })
            return
        }
        res.send(checkWord(word as string))
    })
    .get('/nextReset', (req, res) => {
        const currentTime = Date.now()
        const timeToMidnight = GLOBAL_RESET - (currentTime % (GLOBAL_RESET))
        const resetTime = new Date(currentTime + timeToMidnight)
        res.send({ resets: resetTime })
    })

export default router;