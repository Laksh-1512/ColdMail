import {Hono} from 'hono'
import {v4 as uuid} from "uuid";
import Track from '../model/TrackmodelSchema';
import {createTransport} from 'nodemailer';
import { sendMail } from '../utils/sendMail';
const app=new Hono();


app.post('/send-mail',async(c)=>{
    const {emails,password}= await c.req.json();
    if(!emails||!password) return c.json({err:"email and pass required"});
    // console.log(password);
    // console.log(process.env.password);
    // console.log(process.env.mongo_url);
    if(password !== process.env.password) return c.json({err:"invalid password"});

    const trackingId=uuid();
    try{
        await Track.create({trackingId});
        await sendMail(emails,trackingId);
        return c.json({trackingId:trackingId});
    }
    catch(err){
        console.error(err);
        return c.json({err:"Failed to send mail"});
    }
})
export default app;