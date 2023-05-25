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

const asyncQuery = (query: string, params: any[]): Promise<any[]> => {
	return new Promise((resolve, reject) => {
	  connection.execute(query, params, (err: Error | null, results: any[]) => {
		if (err) {
		  reject(err);
		} else {
			resolve(results);
		}
	  });
	});
  };


export { asyncQuery, connection };