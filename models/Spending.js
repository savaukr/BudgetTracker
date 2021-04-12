const db = require('../db/db.js')

module.exports= class Spending {

	constructor({category, amount, date, userId}) {
        this.category = category
        this.amount = amount 
        this.date = date,
        this.userId = userId
    }

    async save(){     
        const newSpendings = await db.query(
	        'INSERT INTO spendings (category, amount, date, userId ) values ($1, $2, $3, $4) RETURNING *;',
	        [this.category, this.amount, this.date, this.userId]
	    )     
        return await newSpendings.rows[0]
    }

    static async getAll(){
        const allSpendings = await db.query('SELECT * FROM spendings;')
        return await allSpendings.rows;
    }
    static async getAllByUserId({userId}){
        const allSpendings = await db.query('SELECT * FROM spendings where userId= $1;', [userId])
        return await allSpendings.rows;
    }
    static async getAllByUserIdByDate({userId, d}) {
        const allSpendings = await db.query('SELECT * FROM spendings where userId= $1 AND date = $2 ;', [userId, d])
        return await allSpendings.rows;
    }


    static async findById({id}) {
        const spending = await db.query('SELECT * FROM spendings WHERE id = $1;', [id])
        return await allSpending.rows
    }

    static async findBycategory({category}) {
        const allSpendings = await db.query('SELECT * FROM spendings WHERE category = $1;', [category])
        return await allSpendings.rows[0]
    }
    static async update({categoryName, amount, id}) {
        const updatedSpending = await db.query(`UPDATE spendings SET category=$1, amount=$2 WHERE id = $3   RETURNING * ;`,
         [categoryName, amount, id])
        return await updatedSpending.rows[0]
    }

    static async delete({id}) {
        const spending = await db.query(`DELETE  FROM spendings where id=$1   RETURNING * ;`, [id])
        return await spending.rows[0]
    }
}