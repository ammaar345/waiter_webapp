const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require("body-parser")
const app = express();
//



//
const flash = require('express-flash');
const session = require('express-session');
// const pg = require("pg");
// const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/waiters';


const { Client } = require('pg');

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});
client.connect(); 
const Waiter = require("./waiter");
const WaiterRoutes = require('./waiterRoutes');
const waiter = Waiter(client);
const waiterRoutes = WaiterRoutes(waiter);


app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.engine('handlebars', exphbs({
  layoutsDir: './views/layouts'
}));
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', waiterRoutes.home)
app.get('/waiters/', waiterRoutes.waiterHome)
app.post("/waiters/:username", waiterRoutes.userCreate)
app.get("/waiters/:username", waiterRoutes.getWaiter)
app.post('/days',waiterRoutes.adminUpdate)
app.get("/days", waiterRoutes.admin);
// app.get('/reset',waiterRoutes.reset)
app.post('/reset',waiterRoutes.reset)
const PORT = process.env.PORT || 2009;
app.listen(PORT, function () {
  console.log("App started at port :", PORT);
})