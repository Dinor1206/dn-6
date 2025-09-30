const express=require("express")
const cors=require("cors")
require("dotenv").config()
const bodyParser=require("body-parser")
const productRouter = require("./router/products.routes")



const app=express()

const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine","ejs")
app.use(express.static("public"))


app.get('/', (req, res) => {
  res.send('Salom, dunyo!');
});


//router
app.use(productRouter)







app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishga tushdi`);
});