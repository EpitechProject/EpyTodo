import { verifyToken } from "../utils/token.mjs";
import { returnCommonError, ErrorTypes } from "../utils/errors.mjs";

export const authModule = (req, res, next) => {
    const token = req.cookies["EpyTodoJwtToken"];
    if (!token) return returnCommonError(res, ErrorTypes.NotLoggedIn);

    const decoded = verifyToken(token);
    if (!decoded || !decoded.username)
        return returnCommonError(res, ErrorTypes.InvalidToken);

    req.userEmail = decoded.username; // email stocké dans le token
    next();
};
