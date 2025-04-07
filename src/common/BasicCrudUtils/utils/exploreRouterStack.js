
const exploreRouterStack = (router) => {
    return router.stack
        .filter(layer => layer.route)
        .map(layer => ({
            method: Object.keys(layer.route.methods)[0].toUpperCase(),
            path: layer.route.path
        }));
   
     
    }


  

export {
    exploreRouterStack,

} 