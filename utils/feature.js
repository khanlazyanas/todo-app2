import jwt from "jsonwebtoken"

export const sendcookie = async(user,res,message,statuscode=201)=>{
    const token = jwt.sign({_id: user._id},process.env.JWT_SECRET)
    res.status(201).cookie("token",token,{
        httpOnly:true,
        maxAge: 1000 * 60 * 15,
        sameSite: process.env.NODE_ENV==="Development" ? "lax" : "none",
        secure:process.env.NODE_ENV==="Development" ? false : true
    }).json({
        success:true,
        message,
    })

}