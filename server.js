import express from "express";
import pureIP from "express-pureip";
import cors from "cors";
import router from "./routes/index.js"
(() => {
    const app = express();
    app
        .use(express.json())
        .use(pureIP)
        .use(cors())
        .use(router)
        .listen(3000)
})();