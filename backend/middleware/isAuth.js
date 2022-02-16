
const isAuth = (req, res, next) => {

    let user = req.profile && req.user && req.profile._id.equals(req.user._id);
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next()
}

module.exports = isAuth