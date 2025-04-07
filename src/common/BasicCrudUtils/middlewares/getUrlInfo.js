const getUrlInfo = (req,res,next)=>{
    req.hostUrl = `${req.protocol}://${req.get('host')}`,
    req.baseUrl = req.baseUrl
    next()
}

export default getUrlInfo