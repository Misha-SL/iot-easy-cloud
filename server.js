import express from 'express';
import apiHandlers from './api/index'
import pagesHandlers from './pages/index'
const app = express();

//app.use((req, res) => {
  //res.end("Hello world");
//});

app.use("/api", apiHandlers);
app.use("/", pagesHandlers);

app.listen(80, () =>{
  console.log("http://localhost:80/")
});