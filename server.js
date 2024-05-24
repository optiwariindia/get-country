import express from "express";
import pureIP from "express-pureip";
import fileUpload from "express-fileupload";
import getLocation from "./utils/getLocation.js";
import cors from "cors";

(()=>{
    const app=express();
    app
        .use(express.json())
        .use(fileUpload())
        .use(pureIP)
        .use(cors())
        .use(async (req,res,next)=>{
            let whoisInfo=await getLocation(req.clientIP);
            console.log(whoisInfo)
            let cn=(whoisInfo["country"] instanceof Array)?whoisInfo["country"].find(cn=>cn!="zz"):whoisInfo["country"]
            res.json({
                ip:req.clientIP??"",
                cn
            })
        })
        .listen(3000)
    console.log("Server not started")
})()