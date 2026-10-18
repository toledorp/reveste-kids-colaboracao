//importando o model de usuarios
import User from "../models/Users.js"

class userService{
    //Metodo para cadastar um usuario
    async Create(name, email, password, role = "user"){
        try{
            const newUser = new User({
                name,
                email,
                password,
                role
            })
            //.save() -> utilzado para gravar um registro no BD
            await newUser.save();
            return newUser
        }catch (error){
            console.log(error)
            throw error
        }
    }

    //método para buscar um usuario
    async getOne(email){
        try{
            // o metodo findone busca um reguistro no bd
            const user = await User.findOne({email: email})
            return user
        }catch (error) {
            console.log(error)
            throw error
        }
    }
}

export default new userService();