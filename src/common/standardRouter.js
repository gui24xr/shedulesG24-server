import express from  'express'

export class StandardRouter{
    constructor({model,validateSchema,middlewareOrderedArray}){
        this.router = express.Router()
        this.middlewareOrderedArray = middlewareOrderedArray
        this.model = model
        this.validateSchema = validateSchema
        
        // Apply middleware to all routes under this basePath
        this.router.use(...middlewareOrderedArray)
        
        // Create routes
        this.#makeRoutes()
    }

    #makeRoutes = () => {

        if (!this.model || !this.validateSchema) {
            throw new Error("Model and validation schema must be set before building routes");
        }
        
            this.router.post("/", async (req,res,next)=>{
                try{
                    this.validateSchema.createSchema.parse(req.body)
                    const created = await this.model.create({...req.body})
                    return res.status(201).json({...created.toObject()})
                }catch(error){
                    throw error
                }
            })

            this.router.get("/:id", async (req,res,next)=>{
                try{
                    const founded = await this.model.findById(req.params.id).exec()
                    return res.status(200).json({...founded.toObject()})
                }catch(error){
                    throw error
                }
            })

            this.router.get("/", async (req,res,next)=>{
                try{
                    this.validateSchema.querySchema.parse(req.query)
                    const founded = await this.model.find(req.query).exec()
                    return res.status(200).json({...founded})
                }catch(error){
                    throw error
                }
            })

            this.router.put("/:id", async (req,res,next)=>{
                try{
                    this.validateSchema.updateSchema.parse(req.body)
                    const updated = await this.model.findByIdAndUpdate(req.params.id, {...req.body}, {new: true}).exec()
                    return res.status(200).json({...updated.toObject()})
                }catch(error){
                    throw error
                }
            })
            
            this.router.delete("/", async (req,res,next)=>{
                try{
                    const ids = req.query.ids?.split(",");
                    const result = await this.model.deleteMany({
                        _id: {$in: ids}
                    })
                    if (result.deletedCount < ids.length) throw new Error("Uno o mas registros no han sido borrados...")
                    return res.status(204)
                }catch(error){
                    throw error
                }
            })
    }

    

    getRouterInstance = () => {
        return this.router
    }

   

    getRoutesList = () => {
        return this.router.stack
            .filter(layer => layer.route || (layer.name === 'router' && layer.handle.stack)) 
            .map(layer => {
                if (layer.route) {
                    return {
                        method: Object.keys(layer.route.methods)[0].toUpperCase(),
                        path: layer.route.path
                    };
                } else if (layer.name === 'router') {
                    return layer.handle.stack
                        .filter(innerLayer => innerLayer.route)
                        .map(innerLayer => ({
                            method: Object.keys(innerLayer.route.methods)[0].toUpperCase(),
                            path: innerLayer.route.path
                        }));
                }
            })
            .flat();
    };
}

//-----------------------------------------------------------------
/*
const middlewareOrderedArray = [
    passport.authenticate("jwt",{session:false}),
    checkRole(['dev'])

]

const routesNamesAndControllersArray = [
    { collectionName: 'bookings', controller: bookingsControllers },
    { collectionName: 'companies', controller: companiesControllers },
    { collectionName: 'companybranchs', controller: companyBranchsControllers },
    { collectionName: 'customers', controller: customersControllers },
    { collectionName: 'employees', controller: employeesControllers },
    { collectionName: 'notificationsconfigs', controller: notificationsConfigsControllers },
    { collectionName: 'owners', controller: ownersControllers },
    { collectionName: 'pendingemployeeusers', controller: pendingEmployeeUsersControllers },
    { collectionName: 'providedservices', controller: providedServicesControllers },
    { collectionName: 'schedules', controller: shedulesControllers },
    { collectionName: 'scheduleslots', controller: sheduleSlotsControllers },
    { collectionName: 'users', controller: usersControllers },
    { collectionName: 'waitinglists', controller: waitingListsControllers }
];



const routesGroup = new RoutesGroup('/api/dev', middlewareOrderedArray)
routesGroup.addControllersList(routesNamesAndControllersArray)
const devRouter = routesGroup.getRouterInstance()
// Mostrar las rutas del `router`
console.log(routesGroup.getRoutesList());

export default devRouter

*/