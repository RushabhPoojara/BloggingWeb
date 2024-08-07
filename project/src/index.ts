import { Hono } from 'hono'
import {user} from './routes/user'
import {blog} from './routes/blog'
import { cors } from 'hono/cors'




const app = new Hono()

app.use('/*' ,cors())
app.route('/api/v1/user', user)
app.route('/api/v1/blog', blog)



export default app
