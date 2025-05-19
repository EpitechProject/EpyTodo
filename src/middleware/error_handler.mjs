import { ErrorTypes, returnCommonError } from "../utils/errors.mjs";

export const errorHandlerModule = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    if (process.env.DEBUG === "yes")
        console.error(err);
    return returnCommonError(res, ErrorTypes.UnknownException);
};
