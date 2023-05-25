const mysql = require('mysql2');
import config from "./config";

import { TSError } from 'ts-node';

const connection = mysql.createConnection({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database
});


export default connection;