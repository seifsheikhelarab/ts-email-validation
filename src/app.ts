import dotenv from "dotenv";
dotenv.config();
import express from "express";

import { router } from "./routes.js";
import sessionSetup from "./config/session.config.js";
import databaseSetup from "./config/database.config.js";
import middlewareSetup from "./config/middleware.config.js";
import { fileURLToPath } from 'url';
import path from "path";


const app = express();

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));


databaseSetup();
middlewareSetup(app);
sessionSetup(app);
app.use(router);

app.listen(process.env.PORT, () => console.log(`App listening on http://localhost:${process.env.PORT}`))