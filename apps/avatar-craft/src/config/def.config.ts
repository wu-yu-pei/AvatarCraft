const defConfig = {
  nest_server_port: 5210,
  prefix: '/api',

  swagger_path: 'doc',
  swagger_title: 'Avatar Craft 接口文档',
  swagger_description: 'Avatar Craft 接口文档',
  version: '1.0',

  jwt_secret: 'abvdc',
  jwt_access_token_expires_time: '30m',

  app_id: 'wxfd9e4d0f7ffcdbf4',
  app_secret: '72efdd0e4f4801632b4c5e65aa63b48b',
};

export default () => defConfig;
