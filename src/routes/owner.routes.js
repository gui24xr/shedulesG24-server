
import express from 'express'
import passport from '../config/passport.js'
import { checkRole, checkUserEnabled } from '../middlewares/index.middlewares.js'
import { ownersService } from '../services/index.services.js'

const ownerRouter = express.Router()

ownerRouter.get('/',passport.authenticate("jwt_owners_app",{session:false}),async(req,res,next)=>{
    try{
        const foundedOwner = await ownersService.getOwnerById(req.user.owner.id)
        console.log('foundedOwner: ', foundedOwner)
        return res.status(200).json(foundedOwner)
    }catch(error){
        next(error)
    }
})

ownerRouter.put('/',passport.authenticate("jwt_owners_app",{session:false}),async(req,res,next)=>{
    try{
        //Aca tendria que validar en controller
        const updatedOwner = await ownersService.updateOwnerProfile(req.user.owner.id, req.body)
        return res.status(200).json(updatedOwner)
    }catch(error){
        next(error)
    }
})


export default ownerRouter;
