import dotenv from 'dotenv'

dotenv.config()

function requireOwner(req, res, next) {

    const ownerEmails = process.env.OWNER_EMAILS
    .split(",")
    .map(email => email.trim());

    if (!ownerEmails.includes(req.session.user.email)) {
        return res.status(403).json({
            message: "Access denied"
        });
    }

    next();
}

export default requireOwner;