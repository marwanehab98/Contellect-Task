import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contacts.js";


/* CONFIG */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/contacts", contactRoutes);

/* MONGOOSE SETUP */
const PORT = 3001 || 6001;
mongoose.connect('mongodb+srv://marwanelsheikh:Ks6GICoJCYUpDj3C@cluster0.gvqo3nt.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`SERVER RUNNING ON PORT: ${PORT}`))
}).catch((error) => console.log(`${error} did not connect`));