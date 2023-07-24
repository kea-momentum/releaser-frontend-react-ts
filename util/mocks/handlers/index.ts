import {projectListHandlers} from "./ProjectHandlers";
// import { setupWorker } from "msw";

export default [...projectListHandlers];
// const worker = setupWorker(...projectListHandlers);

// if(process.env.NODE_ENV === "development") {
//     worker.start();
// }