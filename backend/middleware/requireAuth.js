function requireAuth(req, res, next) {

    if (!req.session.user) {
        return res.status(401).json({
            authenticated: false,
            message: "Authentication required"
        });
    }

    next();
}

export default requireAuth;