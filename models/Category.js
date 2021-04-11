const pool = require('../db/db.js')

module.exports = class Category {
 
    constructor({name, userId}) {
        this.name = name,
        this.userId = userId
    }
    async save(){
        const newCategory = await pool.query('INSERT INTO categories (name, userId) values ($1, $2) RETURNING *;', [this.name, this.userId]);
        return newCategory.rows[0]
    }
    static async findOne(name, userId) {
        const category = await pool.query('SELECT * FROM categories WHERE name = $1 AND userId = $2;', [name, userId])
        return await category.rows[0]
    }
    static async getAll(){
        const allCategories = await pool.query('SELECT * FROM categories;;')
        return await allUsers.rows;
    }
    static async delete(name, userId) {
        const category = await pool.query(`DELETE  FROM categories where name=$1 AND userId=$2  RETURNING *;`, [name, userId])
        return await category.rows
    }
}