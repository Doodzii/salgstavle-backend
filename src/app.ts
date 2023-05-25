import express, { Request, Response } from 'express';
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

export default app;