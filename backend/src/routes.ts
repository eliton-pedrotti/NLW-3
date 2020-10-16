import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

//Router do express
const routes = Router()
const upload = multer(uploadConfig)

//MVC
//MODEL => REPRESENTA UM DADO , EX: USUÁRIO, ORFANATO, ETC
//VIEWS => O QUE É VIZUALIZADO NO FRONTEND
//CONTROLLERS => É ONDE FICA A LÓGICA 


//Rota de requisição
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)


export default routes