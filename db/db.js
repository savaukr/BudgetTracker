const Pool =  require('pg').Pool
const config = require('config');
const dbConfig = config.get('db.Config')

const pool = new Pool({...db.Config, 
	connectionString: process.env.DATABASE_URL,
	ssl: {
	    rejectUnauthorized: false
	}
})
module.exports = pool