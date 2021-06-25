require("dotenv").config({ path: "./.env" });
const express = require("express");
const connectDB = require("./config/db");
const pizzasRoutes = require('./routes/pizzas');
const ingredientsRoutes = require('./routes/ingredients');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/pizzas', pizzasRoutes);
app.use('/api/ingredients', ingredientsRoutes);

app.use((req, res, next) => {

    // Dominio que tengan acceso (ej. 'http://example.com')
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Metodos de solicitud que deseas permitir
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

    // Encabecedados que permites (ej. 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Headers', '*');

    next();
})

if (process.env.NODE_ENV === 'producction') {
    app.use(express.static(path.join(__dirname, '/front/build')))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "front", "build","index.html"))
    })
} else {
    app.get("*", (req, res) => {
        res.send("API Runinng")
    })
}

const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
