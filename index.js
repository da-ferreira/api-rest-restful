require('dotenv').config();

const express = require('express');
const app = express();
let data = require('./data.json');

app.use(express.json());

// Rotas de clientes:

app.route('/clients')
    .get((req, res) => res.json(data))
    .post((req, res) => {
        const { name, email } = req.body;

        // Toda a lógica de salvar um cliente...

        return res.json({ name, email });
    });

app.route('/clients/:id')
    .get((req, res) => {
        const { id } = req.params;
        const client = data.find(client_i => client_i.id == id);

        if (! client) {  // Se o cliente não existe
            return res.status(204).json();
        }

        return res.json(client);
    })
    .put((req, res) => {
        const { id } = req.params;
        const client = data.find(client_i => client_i.id == id);

        if (! client) {  // Se o cliente não existe
            return res.status(204).json();
        }
        
        const { name } = req.body;
        client.name = name;

        return res.json(client);
    })
    .delete((req, res) => {
        const { id } = req.params;
        data = data.filter(client => client.id != id);

        return res.json(data);
    });


app.listen(process.env.HOST_PORT, () => {
    console.log(`Server is running (http://localhost:${process.env.HOST_PORT})`);
});
