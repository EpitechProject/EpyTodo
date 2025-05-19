import { Router } from "express";
import { isNumber } from "../../utils/utils.mjs";
import { authModule } from "../../middleware/auth.mjs";

const LocalRouter = Router();

LocalRouter.use(authModule);

LocalRouter.get("/user", (req, res) => {
    res.send("/user");
});

LocalRouter.get("/users/todos", (req, res) => {
    res.send("/user/todos");
});

LocalRouter.get("/users/:id", (req, res) => {
    var answer = req.params;
    answer["answer"] = "User get";
    if (!isNumber(req.params.id))
        answer["type"] = "User get email";
    else
        answer["type"] = "User get id";
    res.send(answer);
});

LocalRouter.put("/users/:id", (req, res) => {
    var answer = req.params;
    answer["answer"] = "User get";
    res.send(answer);
});

LocalRouter.delete("/users/:id", (req, res) => {
    var answer = req.params;
    answer["answer"] = "User get";
    res.send(answer);
});

export default LocalRouter;
