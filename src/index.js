import './config/dotenv.js'
import { app } from "./app.js";
import {connectToDatabase} from './config/database.config.js'

const PORT = process.env.PORT || 8085
await connectToDatabase()

app.listen(PORT,()=>{
    console.log(`Documents Server escuchando en puerto ${PORT}.`)
})

