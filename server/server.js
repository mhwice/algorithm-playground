import express from "express";

const app = express();
const path = require("path");

const publicPath = path.join(__dirname, "./../", "public");
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get("*", (_, res) => {
	res.sendFile(path.join(publicPath, "index.html"));
});

app.listen(port, () => {});
