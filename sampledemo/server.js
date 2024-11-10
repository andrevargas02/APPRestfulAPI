const express = require('express');
const studentRoutes = require('./routes/students');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/students', studentRoutes);

app.listen(port, () => {
  console.log(`porta do server http://localhost:${port}`);
});
