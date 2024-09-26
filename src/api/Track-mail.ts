import { Hono } from "hono";
import {getConnInfo} from 'hono/bun'
import Track from "../model/TrackmodelSchema";
import { promises as fs } from "fs";
const path = require('path');
const app = new Hono();

let imageBuffer:Buffer;
(async () => {
    try {
        // Use path.join to construct the file path correctly
        const filePath = path.join(__dirname, 'assets', 'water-lily-3784022_640.jpg');
        imageBuffer = await fs.readFile(filePath);
    } catch (err) {
        console.error(err); // Log the actual error
    }
})();

app.get("/track-mail/:id",async (c) => {
    const id = c.req.param('id');
    const userIP =c.req.raw.headers.get('true-client-ip')||c.req.raw.headers.get('cf-connecting-ip')||getConnInfo(c).remote.address||"0.0.0.0";
    if(!id)return c.json({err:"id required"});
    try{
        const track =await Track.findOne({trackingId:id});
        if(!track) return c.json({err:"tracking ID not found"});
        // console.log(userIP);
        if(!track.userIPs.includes(userIP)) {
            // console.log("user already opened");
            track.opens++;
            track.userIPs.push(userIP);
            await track.save();
        }
        return new Response(imageBuffer,{
            headers:{
                "content-type":"image/avif",
                "content-length":imageBuffer.length.toString(),
        }});
    }
    catch(err){
        console.error(err);
        return c.json({err:"db error"});
    }
});

export default app;