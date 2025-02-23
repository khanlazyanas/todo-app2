import mongoose from "mongoose";

export const connectdatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "node5revision",
    })
    .then(() => console.log("Database connected successfully"))
    .catch((e) => console.log(e));
};
