import express from 'express';
import apiHandlers from './api/index'
import pagesHandlers from './pages/index'
const app = express();
app.set('port', process.env.PORT || 8080);

//app.use((req, res) => {
  //res.end("Hello world");
//});

app.use("/api", apiHandlers);
app.use("/", pagesHandlers);

app.listen(app.get('port'), () =>{
  console.log("http://localhost:"+app.get('port')+"/");
});