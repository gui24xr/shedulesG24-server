

export const checkRole = (allowRolesArray) => async (req, res, next) => {
    //console.log('checkRole: ', req.user)
    !allowRolesArray.includes(req.user.role)
      ? res.status(401).json("Sorry you do not have access to this route")
      : next();
  };