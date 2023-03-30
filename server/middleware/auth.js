import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) return res.status(403).send("Access Denied");

        if (token.startsWith("Bearer ")) token = token.slice(7, token.length).trimLeft();

        const verified = jwt.verify(token, "Y0u-Kn0w-517-H4pp3n5-50m371m35-3v3n-7h0u9h-W3-W15h-1t-D1d-N07-6u7-W3-4r3-H3r3-70-H3lp-H0w3v3r-W3-C4n");
        req.user = verified;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}