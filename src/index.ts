import { TSError } from 'ts-node';

import App from "./App";
import { connection } from './database/Database';

import "./routes/applyRoute";
import "./routes/loginRoute";
import "./routes/verifyRoute";

const port = 3000;

connection.connect((err: TSError) => {
  if (err) {
    console.error('❌ MySQL connection error', err);
    return;
  }
  console.log('✔️  MySQL connection established');
});

App.listen(port, () => {
  console.log(`✔️  Express running on port ${port}`);
});