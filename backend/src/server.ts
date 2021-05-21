import express from "express";
import "./database";
import { routes } from "./routes";

const app = express();

var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log("Server is runnig on port 3333"));
