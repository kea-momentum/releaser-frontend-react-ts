import { rest } from "msw";
import { ProjectListData } from "../data/ProjectData";

export const projectListHandlers = [
    rest.get(`/api/projects`, (_req, res, ctx) => {
        return res(ctx.json(ProjectListData));
    }),

    rest.get("/__nextjs_original-stack-frame", (_req, res, ctx) => {
        return res(ctx.status(200));
    }),
];