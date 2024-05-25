import getLocation from "../utils/getLocation.js"
import express from "express";
const router = express.Router();
router.route("/")
    .get(async (req, res) => {
        let whoisInfo = await getLocation(req.clientIP);
        console.log(whoisInfo)
        let cn = (whoisInfo["country"] instanceof Array) ? whoisInfo["country"].find(cn => cn != "zz") : whoisInfo["country"]
        res.json({
            ip: req.clientIP ?? "",
            cn
        })
    })
    .post(async (req, res) => {
        let whoisInfo = await getLocation(req.body.ip ?? req.clientIP);
        let cn = (whoisInfo["country"] instanceof Array) ? whoisInfo["country"].find(cn => cn != "zz") : whoisInfo["country"]
        res.json({
            ip: req.body.ip ?? req.clientIP ?? "",
            cn
        })
    })

export default router;