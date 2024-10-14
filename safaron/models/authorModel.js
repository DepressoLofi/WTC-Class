const db = require('../config/database.js')

class Author {
    static async create(name, email){
        try {
            const [result] = await db.query('INSERT INTO authors (name, email) VALUES (?, ?)', [name, email])
            return result.insertId;
        } catch (error) {
            console.error('Error from create author: ', error);
            throw error;
        }
    }

    static async findAll(){
        try {
            const [rows] = await db.query('SELECT * FROM authors')
            return rows;
        } catch(error){
            console.error('Error from create author: ', error);
            throw error;
        }
    }

    static async findById(id){
        try {
            const [rows] = await db.query('SELECT * FROM authors WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error("Error from find by id author: ", error);
            throw error;
        }
    }

    static async update(id, name, email){
        try {
            await db.query('UPDATE authors SET name = ?, email = ? WHERE id = ?', [name, email, id])
        } catch (error) {
            console.error('Error from update author: ', error)
            throw error;
        }
    }

    static async delete(id){
        try {
            await db.query('DELETE FROM authors WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error from delete author: ', error);
            throw error;
        }
    }
}

module.exports = Author;