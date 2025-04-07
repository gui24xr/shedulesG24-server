import {exploreRouterStack} from '../utils/exploreRouterStack.js'

const getRoutesInfoController = (router) => {
return  (req,res)=>{
    const routesList = exploreRouterStack(router)
    const routesListWithUrl = routesList.map( route => ({
        method: route.method,
        url: req.hostUrl + req.baseUrl + route.path
    }))
    res.json(routesListWithUrl)
   }
}

export default getRoutesInfoController