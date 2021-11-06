const express = require('express')
const cookie_parser = require('cookie-parser')
const bodyParser = require('body-parser');
const cors = require('cors');

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'medi'
});

const app = express()
const port = process.env.PORT || 3000

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

const MyClass = require('./utils/test_class');

app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cookie_parser())
//app.use(validateCookie)
app.use(
    bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

const home = require('./route/home/home');
const doctor = require('./route/doctor/doctor');
const appointment = require('./route/appointment/appointment');
const login = require('./route/login/login');
const signup = require('./route/signup/signup');
const logout = require('./route/logout/logout');
const advice = require('./route/advice/advice');

app.set('view engine', 'ejs')

app.use('/home', home)
app.use('/login', login)
app.use('/signup', signup)
app.use('/doctors', doctor)
app.use('/logout', logout)
app.use('/appointment', appointment)
app.use('/advice', advice)


app.get('/', (req, res) => {
    let myClass = new MyClass("Nazmul");
    myClass.disPlay()
    res.render('index')//blockchain

})

app.get('/error', (req, res) => {
    res.render('server_error')
})

app.listen(port, () => console.log(`App listening on the port ${port}`))