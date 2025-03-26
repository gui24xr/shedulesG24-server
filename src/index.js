import './config/dotenv.js'
import { server } from "./app.js";

import {connectToDatabase} from './config/database.config.js'

//const PORT = process.env.PORT || 8085
await connectToDatabase()


server.start()


