import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/token.mjs";
import { ErrorTypes, returnCommonError } from "../../utils/errors.mjs";
import { getUserByEmail, createUser } from "./auth.query.mjs";

const AuthRouter = Router();

AuthRouter.post("/register", async (req, res) => {
  const { email, name, firstname, password } = req.body;

  if (!email || !name || !firstname || !password)
    return returnCommonError(res, ErrorTypes.BadParameters);

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return returnCommonError(res, ErrorTypes.AlreadyExists);

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({ email, password: hashedPassword, name, firstname });

    const jwtToken = generateToken(email);
    res.cookie("EpyTodoJwtToken", jwtToken, { httpOnly: true });
    res.send({ token: jwtToken });
  } catch (err) {
    console.error(err);
    return returnCommonError(res, ErrorTypes.UnknownException);
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return returnCommonError(res, ErrorTypes.BadParameters);

  try {
    const user = await getUserByEmail(email);
    if (!user)
      return returnCommonError(res, ErrorTypes.BadCredentials);

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return returnCommonError(res, ErrorTypes.BadCredentials);

    const jwtToken = generateToken(email);
    res.cookie("EpyTodoJwtToken", jwtToken, { httpOnly: true });
    res.send({ token: jwtToken });
  } catch (err) {
    console.error(err);
    return returnCommonError(res, ErrorTypes.UnknownException);
  }
});

AuthRouter.post("/logout", (req, res) => {
  res.clearCookie("EpyTodoJwtToken");
  res.send({ msg: "User successfully logged out!" });
});

export default AuthRouter;
