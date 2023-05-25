const devConfig = {
    db_host: '135.181.20.58',
    db_port: '26063',
    db_user: 'doodie',
    db_password: 'Jh28LPrvt8o3qnv74bh2z42LN',
    db_database: 'salgstavle',
    email_host: "asmtp.yousee.dk",
    email_port: 587,
    email_username: "test@pc.dk",
    email_password: "Test123456"
};
  
const prodConfig = {
    db_host: 'localhost',
    db_port: '26063',
    db_user: 'your_username',
    db_password: 'your_password',
    db_database: 'your_database',
    email_host: "",
    email_port: 587,
    email_username: "",
    email_password: ""
};
  
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
  
export default config;