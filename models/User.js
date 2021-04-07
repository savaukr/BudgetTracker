const db = require('../db/db.js')

module.exports = class User {
 
    constructor({name, email, hachedPassword}) {
        this.name = name
        this.email = email
        this.password = hachedPassword 
    }
    async save(){
        const newUser = await db.query('INSERT INTO users (name, email, password) values ($1, $2, $3) RETURNING *', [this.name, this.email, this.password]);
    }
    static async findOne(email) {
        console.log('use=')
        const user = await db.query('SELECT * FROM users WHERE email = $1;', [email])

        return await user.rows[0]
    }
    static async getAll(){
        const allUsers = await db.query('SELECT * FROM users;')
        return await allUsers.rows;
    }
    static async delete(id) {
        const user = await db.query(`DELETE  FROM users where id=$1  RETURNING *`, [id])
        return await user.rows
    }
}