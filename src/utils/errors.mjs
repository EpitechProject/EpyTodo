export const ErrorTypes = {
  BadParameters: { code: 400, message: "Bad parameters" },
  NotLoggedIn: { code: 401, message: "Not logged in" },
  InvalidToken: { code: 403, message: "Invalid token" },
  BadCredentials: { code: 401, message: "Bad credentials" },
  AlreadyExists: { code: 409, message: "User already exists" },
  UnknownException: { code: 500, message: "Unknown exception" },
};


export const HttpErrorCodes = {
    BadRequest:                     400,
    Unauthorized:                   401,
    PaymentRequired:                402,
    Forbidden:                      403,
    NotFound:                       404,
    MethodNotAllowed:               405,
    NotAcceptable:                  406,
    ProxyAuthRequired:              407,
    RequestTimeout:                 408,
    Conflict:                       409,
    Gone:                           410,
    LengthRequired:                 411,
    PreconditionFailed:             412,
    ContentTooLarge:                413,
    URITooLong:                     414,
    UnsupportedMediaType:           415,
    RangeNotSatisfiable:            416,
    ExpectationFailed:              417,
    ImATeapot:                      418,
    MisdirectedRequest:             421,
    UnprocessableContent:           422,
    Locked:                         423,
    FailedDependency:               424,
    TooEarly:                       425,
    UpgradeRequired:                426,
    PreconditionRequired:           428,
    TooManyRequests:                429,
    RequestHeaderFieldsTooLarge:    431,
    UnavailableLegalReasons:        451,
    InternalServerError:            500,
    NotImplemented:                 501,
    BadGateway:                     502,
    ServiceUnavailable:             503,
    GatewayTimeout:                 504,
    HTTPVersionNotSupported:        505,
    VariantAlsoNegotiates:          506,
    InsufficientStorage:            507,
    LoopDetected:                   508,
    NotExtended:                    510,
    NetworkAuthRequired:            511,
};

export const returnCommonError = (res, type) => {
    switch (type) {
        case ErrorTypes.NotLoggedIn:
            return res.status(HttpErrorCodes.Unauthorized).json(
                { "msg" : "No token, authorization denied" }
            );
        case ErrorTypes.BadCredentials:
            return res.status(HttpErrorCodes.Unauthorized).json(
                { "msg" : "Invalid Credentials" }
            );
        case ErrorTypes.InvalidToken:
            return res.status(HttpErrorCodes.Unauthorized).json(
                { "msg" : "Token is not valid" }
            );
        case ErrorTypes.NotFound:
            return res.status(HttpErrorCodes.NotFound).json(
                { "msg" : "Not found" }
            );
        case ErrorTypes.BadParameters:
            return res.status(HttpErrorCodes.BadRequest).json(
                { "msg" : "Bad parameter" }
            );
        default:
            return res.status(HttpErrorCodes.InternalServerError).json(
                { "msg" : "Internal server error" }
            );
    }
};
