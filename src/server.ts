import express, { Request, Response } from 'express'
import { initRoutes } from './routes'
import fs from 'fs'

export const GLOBAL_RESET = 24 * 60 * 60 * 1000

const app = express()
const port = 3001

interface IWordConfig {
    word: string,
    generated: number
}

const randomiseWord = () => {
    const words = fs.readFileSync('./src/words.txt', 'utf8').split('\n')
    const word = words[Math.floor(Math.random() * words.length)]

    const config = { word, generated: Date.now() }

    fs.writeFileSync('./src/last.json', JSON.stringify(config))

    return word
}

const getLastWord = () => {
    if (!fs.existsSync('./src/last.json')) 
        return randomiseWord()

    const config = JSON.parse( fs.readFileSync('./src/last.json', 'utf8')) as IWordConfig
    return config.word.trim()
}

export let RANDOM_WORD_OF_THE_DAY = getLastWord()

const currentTime = Date.now()
const timeToMidnight = GLOBAL_RESET - (currentTime % (GLOBAL_RESET))

setTimeout(() => {
    RANDOM_WORD_OF_THE_DAY = randomiseWord()

    setInterval(() => {
        RANDOM_WORD_OF_THE_DAY = randomiseWord()
    }, )

}, timeToMidnight)

initRoutes(app)
    .listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    }
);
