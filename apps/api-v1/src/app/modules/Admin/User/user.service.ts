import { db, user } from "@piggy/db"

const getAllAdmins = async(req,res)=> {

const users = await db.select().from(user).where(user.role === 'admin');
    return users;
}

export const userService = {
  getAllAdmins,
};
