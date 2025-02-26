import mongoose from "mongoose";

export const  connectdatabase = ()=>{
  mongoose.connect(process.env.MONGO_URI,{
      dbName: "node5revision"
  }).then((c)=> console.log(`Database Connected with ${c.connection.host}`))
  .catch((e)=> console.log(e))
}
