const mysql   = require("mysql");
const express = require("express");
const  mqtt   = require('mqtt');
const axios = require('axios');
const FCM = require('fcm-node');
const bodyParser = require('body-parser');
const { array } = require("i/lib/util");
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
const UserRoute = require('./router/User');
const TinacoRoute = require('./router/tinaco');
const LoginRoute = require('./router/login');
var app = express();

const usuariosd  = require("./controllers/User.js");
//"661a93523f8438dd8f982f2c"
//Configuring express server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended: true}));
var repuesta = 0;
var success = 0;
var leveTinaco = 0;
//MySQL details
//mongose
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Databse Connected Successfully!! MongoS");    
}).catch(err => {
    console.log('Could not connect to the', err);
    process.exit();
});
//end 
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "studentmanagement",
  multipleStatements: true,
});

//rutas
app.use('/user',UserRoute)
app.use('/tinaco',TinacoRoute)
app.use('/login',LoginRoute)
//end


mysqlConnection.connect((err) => {
  if (!err) console.log("Connection Established Successfully");
  else console.log("Connection Failed!" + JSON.stringify(err, undefined, 2));
});
//enviar notificaciones

var serverKey = 'AAAA-WC5iVo:APA91bFemuUqGNMysDz_C5UHtFNiACLAYPtKuHfBR_tzPtv5a67rRhAauahFSIWGqcOgIIXnQcfCBy8B3nlpD6Oz1bTnDxWWTqI4xKrM6dSEDcQryOviWmA_HCA8VirayIokvL3B3a9C';
var mierver = "0K3SbGueCqMOdTmOX-bthWr2ajcfM-Th7iCbXK_Gyb0";
var fcm = new FCM(serverKey);
//var to = 'fXHFuyDxQhiw1wrmc9Uolg:APA91bGDQSsNPT3zI3bd3699tT6PazMdZBxtLfSqeZz0G9hGEo7fR2KuXp5fjPBYqC-l78r056mFcgPMhidsSiJIDCtlJXk4G9r2kCHEQ4OtAMN7QBEPwJGqyjASil3ydJtJmqHF5Z2r';
var message = {
to:'fXHFuyDxQhiw1wrmc9Uolg:APA91bGDQSsNPT3zI3bd3699tT6PazMdZBxtLfSqeZz0G9hGEo7fR2KuXp5fjPBYqC-l78r056mFcgPMhidsSiJIDCtlJXk4G9r2kCHEQ4OtAMN7QBEPwJGqyjASil3ydJtJmqHF5Z2r',
    notification: {
        title: 'Tinaco',
        body: '{"Tinaco klk"}',
    },
    data: { //you can send only notification or only data(or include both)
        title: 'ok cdfsdsdfsd',
        body: '{"name" : "tinaco","product_id" : "123","final_price" : "0.00035"}'
    }

};

function mesajes(to,titulo,cuerpo )  {
  var asunto ={
  to:to,
   notification: {
     title : titulo,
     body : cuerpo,
     icon:"http://images.app.goo.gl/GdLywg3xfhx6UuRX6",
     data :{
        icon:"http://images.app.goo.gl/GdLywg3xfhx6UuRX6"
     }
   }
  }
  return asunto;
}
const llego =  async function  dart() {
 const  datos1 =  await usuariosd.findOnelocal("661a93523f8438dd8f982f2c");
 //console.log(datos1);
  return datos1;
};


//
//mqtt detalles
const url = "mqtt://localhost:1883";
var options = {
clientId: 12332,
username:'tinaco',
password:'tinaco123',
keepalive: 60
}

const topic = '+/#';
var client = mqtt.connect(url, options);

   client.on('connect',function() {
        console.log("conexion mqtt");

 client.subscribe(topic,function(err){
         console.log("Subcripcion Exitosa");
         });
});

client.on('message', async (topic, payload) => {

              let primera = topic.split('/')[2]
                if(payload.toString() == leveTinaco && success == 0 && primera.toString() == "8CAAB5D661B0") 
                {
                  const  datos1   =  await usuariosd.findOnelocal("661a93523f8438dd8f982f2c");
                  console.log(datos1.fcm);
                  // const usuario =   UserRoute("/user/661a93523f8438dd8f982f2c");
                  //console.log(usuario);
                  fcm.send(mesajes(datos1.fcm,'Nivel Del Tinaco',payload.toString()), function(err, response){
                    if (err){
                        console.log("Something has gone wrong! "+err);
                  console.log("Respponse:! "+mesajes(to,'Mamadas',payload.toString()));
                    } else {
                        // showToast("Successfully sent with response");
                        console.log("Successfully sent with response: ", {response});
                        const hola = JSON.parse(response);
                        success = hola.success
                        console.log(hola.success);
                        leveTinaco = payload.toString();
                        }                
                });

                   }
                   if(leveTinaco != payload.toString()){
                   leveTinaco = payload.toString();
                   success = 0;
                  }

               
                console.log(primera);
  console.log('Received Message:', topic, payload.toString())
})
//Establish the server connection
//PORT ENVIRONMENT VARIABLE

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port http://tlinkslabs.ddns.net:${port}..`));

var numeroregistro = {
numeroregistro:[{
 "fecha":"2024/03/8",
"consorcio":15,
"idbanca":"8"
}]
}

//Creating GET Router to fetch all the student details from the MySQL Database
app.get("/", (req, res) => {
axios.post("http://www.etokenweb.com/webEtoken/destop/desktop.php",numeroregistro).then(
response =>{
   repuesta = response.data;
}
);
   console.log(repuesta);
   res.send( "Tlinkslabs     Tinaco " +repuesta);
});

//para ip bloqueadas 
app.post("/maquinas", async (req, res) => {
  try {
  const datos  = req.body;
  console.log(datos);
    const response = await axios.post("http://www.etokenweb.com/webEtoken/destop/desktop.php",datos);
  
    if (Array.isArray(response.data)) {
      console.log(" nos es "+response.data);
      res.json(response.data);     
    }else {
      console.log(`servidor1 ${response.data}`);
      res.send(""+response.data);
    }
   } catch (error) {    
    }  
});
app.post("/servidor2",  async (req, res) => {
  const datos  = req.body;
    console.log( datos);
    const response = await axios.post("http://www.etokenweb2.com/webEtoken/destop/desktop.php",datos);
    console.log(`servidor2 ${response.data}`);
    res.json(response.data);
    
});
app.get("/tinacos", (req, res) => {

    mysqlConnection.query("SELECT * FROM student", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Router to GET specific student detail from the MySQL database
app.get("/tinaco/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM student WHERE student_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});
//Router to INSERT/POST a student's detail
app.post("/tinacos", (req, res) => {
  
  let student = req.body;
  console.log( student);
  if(student.student_id === undefined){
    student.student_id = 0;
  }
  res.send("Student Created Successfully "+ student.student_name);
 
  //  mysqlConnection.query("",[],
  //   (err, rows, fields) => {
  //     if (!err) res.send("Student Created Successfully");
  //     else console.log(err);
  //   }
  // );
});
//Router to UPDATE a student's detail
app.put("/students", (req, res) => {
  let student = req.body;
  var sql =
    "SET @student_id = ?;SET @student_name = ?;SET @student_email = ?;SET @student_phone = ?; CALL studentAddOrEdit(@student_id,@student_name,@student_email,@student_phone);";
  mysqlConnection.query(
    sql,
    [
      student.student_id,
      student.student_name,
      student.student_email,
      student.student_phone,
    ],
    (err, rows, fields) => {
      if (!err) res.send("Student Details Updated Successfully");
      else console.log(err);
    }
  );
});

//Router to DELETE a student's detail
app.delete("/tinacos/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM student WHERE student_id = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Student Record deleted successfully.");
      else console.log(err);
    }
  );
});
