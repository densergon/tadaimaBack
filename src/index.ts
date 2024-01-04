import express from 'express'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import classesRoutes from './routes/classes.routes'
import studentsRoutes from './routes/students.routes'
import homeworksRoutes from './routes/homeworks.routes'
import teachersRoutes from './routes/teachers.routes'
import cursosRoutes from './routes/course.routes'
import materialesRoutes from './routes/materiales.routes'
import * as dotenv from "dotenv";
import morgan from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
dotenv.config();


const app = express();


const port = process.env.PORT;
app.use(cors())

app.set('port', port)
app.use(express.json())
app.use(morgan('dev'));
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/teachers', teachersRoutes)
app.use('/api/classes', classesRoutes)
app.use('/api/homeworks', homeworksRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/materiales', materialesRoutes)
const server = createServer(app)
const io = new Server(server)
io.on("connection", (socket) => {
    console.log('User connected')
    socket.on("disconnect", () => {
        console.log('Disconnected')
    })
    socket.on('chat message', (message) => {
        io.emit('chat message', { message: "Hola" })
    })
})
server.listen(app.get('port'), () => {
    console.log('Listening at port ', app.get('port'))
})