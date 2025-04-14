

const checkUserEnabled = () => async (req, res, next) => {
    //console.log('checkRole: ', req.user)
    if (!req.user.enabled) return res.status(401).json("Sorry, your user is enabled at this moment....")
    return next();
  };

  export default checkUserEnabled;