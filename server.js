import express from "express";
import pureIP from "express-pureip";
import fileUpload from "express-fileupload";
import getLocation from "./utils/getLocation.js";
import cors from "cors";

(() => {
    const app = express();
    app
        .use(express.json())
        
        .use(pureIP)
        .use(cors())
        
        app.route("/api/v1/country")
            .get(async (req, res) => {
                let whoisInfo = await getLocation(req.clientIP);
                console.log(whoisInfo)
                let cn = (whoisInfo["country"] instanceof Array) ? whoisInfo["country"].find(cn => cn != "zz") : whoisInfo["country"]
                res.json({
                    ip: req.clientIP ?? "",
                    cn
                })
                // get country code
            })
            .post(async (req, res) => {
                let whoisInfo = await getLocation(req.body.ip??req.clientIP);
                let cn = (whoisInfo["country"] instanceof Array) ? whoisInfo["country"].find(cn => cn != "zz") : whoisInfo["country"]
                res.json({
                    ip: req.body.ip??req.clientIP ?? "",
                    cn
                })
            })
        app.use(async (req, res, next) => {
            return res.status(401).json({
                error: "Unauthorized"
            })
        })
        .listen(3000)
    console.log("Server not started")
})()