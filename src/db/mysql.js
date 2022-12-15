const mysql = require('mysql2');

const mysqls = mysql.createPool({
  host: '192.168.5.21',
  port: 3306,
  database: 'koatest',
  user: 'koatest',
  password: 'sS3iahLXZRzTjXiP'
});

module.exports = mysqls;