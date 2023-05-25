const devConfig = {
    frontend_url: 'http://127.0.0.1:5173',
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
    frontend_url: '',
    db_host: '',
    db_port: '',
    db_user: '',
    db_password: '',
    db_database: '',
    email_host: "",
    email_port: 0,
    email_username: "",
    email_password: ""
};
  
const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
  
export default config;