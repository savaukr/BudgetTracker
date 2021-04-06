const express = require('express')
const config = require('config');

const app = express()
const PORT = config.get('port')// process.env.PORT || 5000

app.get('/', (req, res) => {
	res.send('all good!!!')
})
app.use('/api/auth', require('./routes/auth.routes.js'))

async function start() {
	try {
		app.listen(PORT, () => {console.log(`App has benn started on port ${PORT}...`)})
	} catch(e) {
		console.log("Server Error", e.message)
		process.exit(1)
	}
}

start()

