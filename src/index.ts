import express, { Request, Response } from 'express'
import authRoutes from './routes/auth.routes'
import usuariosRoutes from './routes/usuarios.routes'
const app = express();

app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/users', usuariosRoutes)

app.listen(3000, () => {
    console.log('Listening at port ', 3000)
})