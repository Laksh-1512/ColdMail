import { CONNECT } from './../node_modules/mongodb/src/constants';
import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { dbconnect } from './db.conifig';
import { createServer } from 'http';
import trackMailRoute from './api/Track-mail'
import sendMailRoute from './api/send-mail'
import getMailStatusRoute from './api/get-mail-status'
const app = new Hono()

app.use(cors());

dbconnect();
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('/track',trackMailRoute)
app.route('/api',sendMailRoute)
app.route('/status',getMailStatusRoute)
export default app
