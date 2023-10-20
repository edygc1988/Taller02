const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://edygc1988:9RMmWurw7HPGfA7O@cluster0.leafvmt.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clienteSchema = new mongoose.Schema({
  nombre: String,
  telefono: String,
});

const ClienteModel = mongoose.model('Cliente', clienteSchema);

const schema = buildSchema(`
    type Cliente {
        id: ID
        nombre: String
        telefono: String
    }
    type Query {
        clientes: [Cliente]
        cliente(id: ID): Cliente
    }
    type Mutation {
        addCliente(nombre: String, telefono: String): Cliente
    }
`);

const root = {
  clientes: async () => {
    return await ClienteModel.find().exec();
  },
  cliente: async (data) => {
    return await ClienteModel.findById(data.id).exec();
  },
  addCliente: async (data) => {
    const nuevoCliente = new ClienteModel({
      nombre: data.nombre,
      telefono: data.telefono,
    });

    await nuevoCliente.save();

    return nuevoCliente;
  },
  
};

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

const port = 4001;
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
