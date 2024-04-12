import { Express } from "express"
import wordle from "./routes/wordle"

export const initRoutes = (app: Express) => {
    return app
    .use('/api/wordle', wordle)
}

