const db = require('../config/database.js')

class Category {
    static async create(name){
        try {
            const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name])
            return result.insertId;
        } catch (error) {
            console.error('Error from create category: ', error);
            throw error;
        }
    }

    static async findAll(){
        try {
            const [ rows ] = await db.query('SELECT * FROM categories');
            return rows;
        } catch (error) {
            console.error('Error from findAll category: ', error);
            throw error;
        }
    }

    static async findById(id){
        try {
            const [ rows ] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error('Error from findById category: ', error);
            throw error;
        }
    }

    static async update(id, name){
        try {
            await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id])
        } catch (error) {
            console.error('Error from update category: ', error);
            throw error;
        }
    }

    static async delete(id){
        try {
            await db.query('DELETE FROM categories WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error from delete category: ', error);
            throw error;
        }
    }
}

module.exports = Category;