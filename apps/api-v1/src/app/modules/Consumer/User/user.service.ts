import { AppError } from "@/app/errors";
import { auth } from "@piggy/auth";
import { CreateUser } from "@piggy/types";

const registerUser = async (userData: CreateUser)=>{
const user = await auth.api.signUpEmail({
  body: {
     name: userData.name,
   email: userData.email,
   password: userData.password,
   userName: userData.userName || "",
  }
});
return user;

}

const loginUser= async(email:string,password:string)=> {
    const user = await auth.api.signInEmail({
        body: {
            email,password
        },
        
    })

    if(!user) throw new AppError(404,"User not found");
    return user;

}


export const UserService = {
    registerUser,loginUser,
}