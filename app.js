const express = require("express");
const app = express();
const expressWs = require("express-ws");
const port = 3000;
const websocket = require("./websocket")
expressWs(app);

//中间件
app.use("/jiang", express.static("./public/jiang.html"));
app.use("/yun", express.static("./public/yun.html"));
//ws://localhost:3000/ws
app.use('/ws', websocket)
app.use(express.static("./public"));
app.get("/", (req, res) => {});

app.listen(port, () => {
    console.log(`listining on port ${port} ...`);
});
