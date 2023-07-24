import { rest } from "msw";
import { userCorrectLogin, userIncorrectLogin } from "../data/loginData";

export const loginHandlers = [
  rest.post("https://my.backend/userCorrectLogin", (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(userCorrectLogin));
  }),

  rest.post("https://my.backend/userIncorrectLogin", (_req, res, ctx) => {
    return res(ctx.status(401), ctx.json(userIncorrectLogin));
  }),
];
