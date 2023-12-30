import express from 'express'
import authRoutes from './routes/auth.routes'
import classesRoutes from './routes/classes.routes'
import studentsRoutes from './routes/students.routes'
import homeworksRoutes from './routes/homeworks.routes'
import teachersRoutes from './routes/teachers.routes'
import cursosRoutes from './routes/course.routes'
import materialesRoutes from './routes/materiales.routes'
import * as dotenv from "dotenv";
import morgan from 'morgan'
dotenv.config();


const app = express();
const port = process.env.PORT;
app.set('port', port)
app.use(express.json())
app.use(morgan('dev'));
app.use('/api/auth', authRoutes)
app.use('/api/students', studentsRoutes)
app.use('/api/teachers', teachersRoutes)
app.use('/api/classes', classesRoutes)
app.use('/api/homeworks', homeworksRoutes)
app.use('/api/cursos', cursosRoutes)
app.use('/api/materiales', materialesRoutes)


app.listen(app.get('port'), () => {
    console.log('Listening at port ', app.get('port'))
})