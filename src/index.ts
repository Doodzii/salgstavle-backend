import express, { Request, Response } from 'express';
import app from "./app";

import "./routes/applyRoute";
import "./routes/loginRoute";

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});