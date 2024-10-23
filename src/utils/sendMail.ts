import {createTransport} from 'nodemailer';
import { Hono } from 'hono';
const transporter = createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.email,
        pass: process.env.password,
    },
});
export const sendMail = async(emails:string[],trackindId:string)=>{
    const trackingURL=`${process.env.base_url}/track/track-mail/${trackindId}`;
    const mailOptions = {
        from: process.env.email,
        to: emails,
        subject: "Tracking email count ",
        html: `
            <h1>Tracking ID:${trackindId}</h1>
            <img src="${trackingURL}" alt="tracking pixel"
            style="display:none;" />
            `,
    };
    // console.log(process.env.email);
    await transporter.sendMail(mailOptions);
}
