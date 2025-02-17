const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

// Load Swagger YAML file
// const swaggerDocument = YAML.load("./swagger.yaml");

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Données fictives pour les produits
let products = [
  { id: 1, name: "Ordinateur portable", price: 999.99 },
  { id: 2, name: "Smartphone", price: 499.99 },
  { id: 3, name: "Tablette", price: 299.99 }
];

// Données fictives pour les commandes
let orders = [];
let orderIdCounter = 1001;

// Route pour récupérer la liste des produits
app.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Route pour créer une commande
app.post('/orders', (req, res) => {
  const { products: orderedProducts } = req.body;

  if (!orderedProducts || !Array.isArray(orderedProducts) || orderedProducts.length === 0) {
    return res.status(400).json({ error: "La commande doit contenir au moins un produit." });
  }

  // Calcul du total de la commande
  const total = orderedProducts.reduce((sum, product) => sum + (product.price || 0), 0);

  // Création de la commande
  const order = {
    id: orderIdCounter++,
    products: orderedProducts,
    total: total
  };

  orders.push(order);

  res.status(201).json(order);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});


// const express = require("express");

// const app = express();
// const port = 3000;

// app.use(express.json());

// // Load Swagger YAML file
// // const swaggerDocument = YAML.load("./swagger.yaml");

// // Serve Swagger UI
// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// // In-memory database (for demo purposes)
// let users = [
//     { id: 1, name: "Anaïs ASSE AKAKPO", email:"assevenus2@gmail.com", password: "aaaaaaaa", phone:"+22950954612", profile: "grossiste"},
//     { id: 2, name: "Alice Dupont", email:"alice.dupont@example.com", password: "aaaaaaaa", phone:"+123456789", profile: "revendeur", },
//   ];
  
//   // Get all users
//   app.get("/users", (req, res) => {
//     res.json(users);
//   });
  
//   // Get user by ID
//   app.get("/users/:id", (req, res) => {
//     const user = users.find((u) => u.id === parseInt(req.params.id));
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json(user);
//   });
  
//   // Create a new user
//   app.post("/users", (req, res) => {
//     const newUser = {
//       id: users.length + 1,
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password,
//       phone: req.body.phone,
//       profile: req.body.profile, // "client" or "grossiste" or "admin"
//     };
//     users.push(newUser);
//     res.status(201).json(newUser);
//   });
  
//   // Update a user
//   app.put("/users/:id", (req, res) => {
//     const user = users.find((u) => u.id === parseInt(req.params.id));
//     if (!user) return res.status(404).json({ message: "User not found" });
  
//     user.name = req.body.name;
//     user.email = req.body.email;
//     user.password = req.body.password;
//     user.phone = req.body.phone;
//     user.profile = req.body.profile;
//     res.json(user);
//   });
  
//   // Delete a user
//   app.delete("/users/:id", (req, res) => {
//     const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));
//     if (userIndex === -1) return res.status(404).json({ message: "User not found" });
  
//     users.splice(userIndex, 1);
//     res.status(204).send();
//   });
  
//   // Start the server
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//     console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
//   });

// // // Define API routes
// // app.get("/", (req, res) => {
// //   res.send("Welcome to the Node.js API!");
// // });

// // // app.get("/api/hello", (req, res) => {
// // //   res.json({ message: "Hello, World!" });
// // // });

// // // Start server
// // app.listen(port, () => {
// //   console.log(`Server running at http://localhost:${port}`);
// //   console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
// // });
