const express = require("express");
const expressWs = require("express-ws");
const router = express.Router();
expressWs(router);

let jiangArr = [];
let yunArr = [];

router.ws("/jiang", (ws) => {
    let timer1 = null;
    ws.on("close", () => {
        if (timer1) clearInterval(timer1);
    });
    
    ws.on("message", (msg) => {
        jiangArr.push(msg);     //接收yun的消息
        ws.send("right" + msg);    //回流自己发送的消息
    });

    timer1 = setInterval(() => {
        if (yunArr.length > 0) {
            let msgItem = yunArr[0];
            yunArr.shift();
            ws.send("left-" + msgItem);
        }
    }, 1000);
});

router.ws("/yun", (ws) => {
    let timer2 = null;
    //连接断开时清清除计时器
    ws.on("close", () => {
        if (timer2) clearInterval(timer2);
    });
    ws.on("message", (msg) => {
        //接收消息
        yunArr.push(msg);

        //自己发送的消息回流
        ws.send("right" + msg);
    });

    //每秒钟检查数组有无新消息
    timer2 = setInterval(() => {
        if (jiangArr.length > 0) {
            let msgItem = jiangArr[0];
            jiangArr.shift();
            ws.send("left-" + msgItem);
        }
    }, 1000);
});

module.exports = router;
