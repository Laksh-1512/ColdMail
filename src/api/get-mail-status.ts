import Track from "../model/TrackmodelSchema";

import {Hono} from  'hono';
const app=new Hono();

app.get('/get-mail-status/:id',async(c)=>{
    const id =c.req.param('id');
    if(!id) return c.json({err:"id required"});
    try{
        const track =await Track.findOne({trackingId:id});
        if(!track) return c.json({err:"tracking ID not found"});
        return c.json({data:track});

    }
    catch(err){
        console.error(err);
        return c.json({err:"failed to get mail status"});
    }

});
export default app;