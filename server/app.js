import express from "express";
import router from "./controller/clash2singboxRouter.js";
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`Hello World!${req.query}  `)
  })
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.use('/clash2singbox', router);