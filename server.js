import { app } from "./app.js";
import { connectdatabase } from "./data/database.js";

connectdatabase();
app.listen(process.env.PORT, () => {
  console.log(`Server is working on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
