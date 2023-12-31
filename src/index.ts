import express from 'express'
import authRoutes from './routes/auth.routes'
import adminRoutes from './routes/admin.routes'
import classesRoutes from './routes/classes.routes'
import studentsRoutes from './routes/students.routes'
import homeworksRoutes from './routes/homeworks.routes'
import teachersRoutes from './routes/teachers.routes'
import cursosRoutes from './routes/course.routes'
import materialesRoutes from './routes/materiales.routes'
import deliveredRoutes from "./routes/delivered.routes"
import * as dotenv from "dotenv";
import morgan from 'morgan'
import cors from 'cors'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import { chatController } from './controllers/chat.controller'
import chatRoutes from './routes/chat.routes'
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
app.use('/api/delivered', deliveredRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/materiales', materialesRoutes)
app.use('/api/chat', chatRoutes)

const server = createServer(app)
const io = new Server(server)
// Registro de usuarios conectados
const userSockets = new Map<string, string>(); // Mapa de userID a socketID

io.on("connection", (socket) => {
    console.log('User connected');

    // Asociar el socket con un usuario específico
    socket.on("register", (userID) => {
        userSockets.set(userID, socket.id);
    });

    socket.on("disconnect", () => {
        console.log('Disconnected');
        for (let [userID, socketID] of userSockets.entries()) {
            if (socketID === socket.id) {
                userSockets.delete(userID);
                break;
            }
        }
    });


    socket.on('chat message', async (message) => {
        if (await chatController.newMessage(message)) {
            const receiverSocketId = userSockets.get(message.para);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('chat message', message);
            }
        }
    });
});
server.listen(app.get('port'), () => {
    console.log('Listening at port ', app.get('port'))
})