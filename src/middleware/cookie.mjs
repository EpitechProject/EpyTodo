export const cookieParserModule = (req, res, next) => {
    if (!req)
        next();
    req.cookies = {};
    if (!req.headers.cookie)
        next();
    const cookies = req.headers.cookie.split("; ");
    cookies.forEach(element => {
        const [ k, v ] = element.split("=");
        if (!k || !v)
            return;
        req.cookies[k] = v;
    });
    next();
};
