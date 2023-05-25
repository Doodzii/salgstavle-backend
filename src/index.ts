import { TSError } from 'ts-node';

import App from "./App";
import { connection } from './database/Database';

import "./routes/applyRoute";
import "./routes/loginRoute";
import "./routes/verifyRoute"

const port = 3000;

connection.connect((err: TSError) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database!');
});

App.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});