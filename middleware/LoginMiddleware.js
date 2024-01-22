class CheckMiddleware {
    checkLocal = (req, res, next) => {
        res.locals.checkLocalUser = req.session && req.session.emailDataSession;
        // console.log(res.locals.checkLocalUser);
        if (res.locals.checkLocalUser) {
            res.locals.userName = res.locals.checkLocalUser.name;
        }
        next();
    }
}

module.exports = new CheckMiddleware;
