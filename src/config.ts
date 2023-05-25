const devConfig = {
    db_host: '135.181.20.58',
    db_port: '26063',
    db_user: 'doodie',
    db_password: 'Jh28LPrvt8o3qnv74bh2z42LN',
    db_database: 'salgstavle'
};
  
const prodConfig = {
    db_host: 'localhost',
    db_port: '26063',
    db_user: 'your_username',
    db_password: 'your_password',
    db_database: 'your_database'
};
  
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
  
export default config;