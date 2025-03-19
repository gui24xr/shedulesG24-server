import express from  'express'
import { checkRole } from '../middlewares/checkRole.js'
import passport from '../config/passport.js'
import {    
    bookingsControllers,
    companiesControllers,
    companyBranchsControllers,
    customersControllers,
    employeesControllers,
    notificationsConfigsControllers,
    ownersControllers,
    pendingEmployeeUsersControllers,
    providedServicesControllers,
    shedulesControllers,
    sheduleSlotsControllers,
    usersControllers,
    waitingListsControllers } from '../controllers/index.js'


class RoutesGroup{
    constructor(baseUrl,middlewareOrderedArray){
        this.router = express.Router()
        this.baseUrl = baseUrl
        this.middlewareOrderedArray = middlewareOrderedArray

        this.router.use(...middlewareOrderedArray)
    }

    
    addControllersList(controllerInstanceList){
        controllerInstanceList.forEach(  item => {
            this.router.post(`${this.baseUrl}/${item.collectionName}`,  item.controller.create,)
            this.router.get(`${this.baseUrl}/${item.collectionName}/:id`, item.controller.getOne, )
            this.router.get(`${this.baseUrl}/${item.collectionName}`, item.controller.getMany)
            this.router.delete(`${this.baseUrl}/${item.collectionName}`, item.controller.deleteManyById)
            this.router.put(`${this.baseUrl}/${item.collectionName}/:id`, item.controller.updateById)
            })
    }


    getRouterInstance = () => {
        return this.router
    }

    getRoutesList = () => {
        return this.router.stack
            .filter(layer => layer.route) 
            .map(layer => ({
                method: Object.keys(layer.route.methods)[0].toUpperCase(),
                path: layer.route.path
        }));
    };
}


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