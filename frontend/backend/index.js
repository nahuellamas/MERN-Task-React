//importamos el modulo express
const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');
const app = express();

conectDB();

//habilitar CORS para que se puedan hacer peticiones desde cualquier lugar
app.use(cors());

//habilitar express JSON
app.use(express.json({ extended: true }));

const PORT = process.env.PORT || 5000;

//import rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyects', require('./routes/proyects'));
app.use('/api/task', require('./routes/task'));

app.listen(PORT, () => {console.log(`Server en puerto ${PORT}`)});

