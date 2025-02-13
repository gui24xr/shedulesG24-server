import express from  'express'

export const router = express.Router()

const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/',defaultFunction)
router.post('/', defaultFunction)
router.delete('/:id',defaultFunction)