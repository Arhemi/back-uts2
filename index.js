const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

//Capturar el Body 
app.use(bodyparser.urlencoded({
    extended: false 
}))
app.use(bodyparser.json())

//Conexion a la base de datos 
const url = `mongodb+srv://${process.env.USUARIO}:${process.env.PASSWORD}@cluster0.nkimxht.mongodb.net/${process.env.DBNAME}`
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a la base de datos!!!'))
.catch((error) => console.log('Error: ' + error))

//Creación e importación de rutas
const authRoutes = require('./routes/auth')

//Ruta del middleware
app.use('/api/user', authRoutes)  

//Ruta raiz
app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Si funciona... vamos a comer!!!'
    })
})

//Arrancar el servidor
const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
}) 