const devConfig = {
  redis_server_host: '127.0.0.1',
  redis_server_port: 6379,
  redis_server_db: 1,

  mysql_server_host: '127.0.0.1',
  mysql_server_port: 3306,
  mysql_server_username: 'root',
  mysql_server_password: '123456',
  mysql_server_database: 'avatar_craft',
};

export default () => devConfig;
