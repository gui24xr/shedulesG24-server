import express from 'express'
import { NotificationsConfigsControllers } from './controllers.js'

export const router = express.Router()
const notificationsConfigControllers = new NotificationsConfigsControllers()


router.get('/:ncid',(req,res,next)=> {res.send('Hola')})
router.get('/',(req,res,next)=> {res.send('Hola')})
router.post('/',((req,res,next)=> {res.send('Hola')}))
router.delete('/',(req,res,next)=> {res.send('Hola')})
router.put('/:ncid',(req,res,next)=> {res.send('Hola')})