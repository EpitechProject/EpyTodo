import jwt from "jsonwebtoken";

export const generateToken = (username, expiration_time = "1h") => {
    if (!username)
        return null;
    return jwt.sign({ username }, process.env.SECRET, { expiresIn: expiration_time });
};

export const verifyToken = (jwtToken) => {
    if (!jwtToken) return null;
    try {
        const decoded = jwt.verify(jwtToken, process.env.SECRET);
        return decoded;
    } catch (err) {
            console.error("JWT error:", err.message);
        return null;
    }
};
