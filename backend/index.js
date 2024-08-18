const express = require("express");
const cors = require("cors");
const { connection } = require("./database/connection")

connection();

const app = express();
const port = 3900;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}))

const routesProject = require("./routes/ProjectRoute")

app.use("/api", routesProject)

app.listen(port, () => {
    console.log("Server started on port: " + port);
});