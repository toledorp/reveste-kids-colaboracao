// middleware de autenticação

import jwt from 'jsonwebtoken'
import userController from '../controllers/userController.js'

//função para verificar a autenticação do usuario
//verificar se ele possui um token
const Authorization = (req, res, next) => {
  //capturar o token do usuario através do cabeçalho da requisição
  const authToken = req.headers['authorization']

  //verificando se o token existe
  if(authToken != undefined){
    const bearerToken = authToken.split(' ')
    const token = bearerToken[1]

    //Verificando se o token é válido
    jwt.verify(token, userController.JWTSecret, (error, data)=>{
      //se o token for invalido
      if(error){
        res.status(401).json({error:"Acesso não autorizado. Token inválido"})
      //se o token for válido
      }else{
        req.token = token
        req.loggerUser = {
          id: data.id,
          email: data.email,
          role: data.role
        }

        //prosseguindo com a requisição
        next()
      }
    })

  // caso o token não exista
  }else{
    res.status(401).json({error:"Acesso não autorizado. Realize o login para ter acesso"})
  }
}

export default { Authorization }