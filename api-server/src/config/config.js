module.exports = {
  development: {
    database: {
      host: 'localhost',
      port: 3306,
      name: 'teste',
      dialect: 'mysql',
      user: 'root',
      password: '123'
    }
  },
  production:{
    database: {
      host: process.env.DB_HOST,
      host: process.env.DB_PORT
    }
  }
}
