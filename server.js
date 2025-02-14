const express = require('express');
const app = express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const fileUpload=require('express-fileupload');
const cors = require('cors');

const cookieParser = require('cookie-parser');


dotenv.config();
const port = process.env.PORT||3000;

//Middlewares
app.use(cors( {credentials: true }));
app.use(fileUpload());
app.use(cookieParser());    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
const signRoute = require('./API/Signup/SignupRoute');
const sequelize = require('./config/database');
const MessageRoute = require('./API/message/messageRoute');
const BankRoute = require('./API/BankManagement/bankRoutes');
const BTRoute = require('./API/BankTransaction/BTRoute');
const MasterRoute = require('./API/MasterManagement/MasterRoute');
const CollectorRoute = require('./API/Collectors/collectorRoute');
const LapuRoute = require('./API/LapuCollector/LapuRoute');
const MTRoute= require("./API/MTManagement/MTRoute");


//index remove script 
exec('node cleanIndex.js', (error, stdout, stderr) => {
    if (error) {
        console.error(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});



sequelize.sync({ alter: true }).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log(err);
});






//routes uses 

app.use("/api/admin", signRoute);
app.use("/message", MessageRoute);//
app.use("/api/bank", BankRoute);
app.use("/api/bank-transaction", BTRoute);// 
app.use("/api/master", MasterRoute);
app.use('/api/collector', CollectorRoute);
app.use("/api/lapu-collector", LapuRoute);
app.use("/api/master-transaction", MTRoute);



//update code


app.get("/", (req, res) => {
    res.send("Hello");
});





app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})