require('dotenv').config()

const server = require('./00-api/server.js.js');

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
