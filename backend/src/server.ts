//importando o express
import express from 'express'
import 'express-async-errors'
import './database/connection'
import routes from './routes'
import path from 'path'
import errorHandler from './errors/handler'
import cors from 'cors'



//Definindo app como a função express
const app = express()

app.use(cors())

//Ajustando o express para reconhecer arquivos em formato JSON
app.use(express.json())

//Ajustando a chamada de rotas
app.use(routes)

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.use(errorHandler)

app.listen(3333)