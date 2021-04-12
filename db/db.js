const Pool =  require('pg').Pool
const config = require('config');
const dbConfig = config.get('dbConfig')

// const pool = new Pool({...dbConfig, 
// 	connectionString: process.env.DATABASE_URL,
// 	ssl: {
// 	    rejectUnauthorized: false
// 	}
// })

const pool = new Pool({...dbConfig,
	connectionString: process.env.DATABASE_URL,
	ssl: {
	    rejectUnauthorized: false
	}
})

module.exports = pool