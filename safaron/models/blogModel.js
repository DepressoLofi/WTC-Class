const db = require('../config/database.js')

class Blog {
    static async create(author_id, category_id, title, content, photo){
        try {
            const [result] = await db.query('INSERT INTO blogs (author_id, category_id, title, content, photo) VALUES (?, ?, ?, ?, ?)', [author_id, category_id, title, content, photo]) 
            return result.insertId;
        } catch (error) {
            console.error('Error in create blog: ', error);
            throw error;
        }
    } 

    static async findAll(){
        try {
            const [rows] = await db
            .query('SELECT blogs.*, authors.name AS author, categories.name AS category FROM blogs JOIN authors ON blogs.author_id = authors.id JOIN categories ON blogs.category_id = categories.id')
            return rows;
        } catch (error) {
            console.error('Error in findAll blog: ', error);
            throw error;
        }
    }

    static async findById(id){
        try {
            const [rows] = await db
            .query('SELECT blogs.*, authors.name AS author, categories.name AS category FROM blogs JOIN authors ON blogs.author_id = authors.id JOIN categories ON blogs.category_id = categories.id WHERE blogs.id = ?', [id])
            return rows[0];
        } catch (error) {
            console.error('Error in findById blog: ', error);
            throw error;
        }
    }

    static async update(id, author_id, category_id, title, content, photo){
        try {
            if (photo){
                await db.query('UPDATE blogs SET author_id = ?, category_id = ?, title = ?, content = ?, photo = ? WHERE id = ?', [author_id, category_id, title, content, photo, id])
            } else {
                await db.query('UPDATE blogs SET author_id = ?, category_id = ?, title = ?, content = ? WHERE id = ?', [author_id, category_id, title, content, id])

            }
        } catch (error) {
            console.error('Error in update blog: ', error);
            throw error;
        }
    }

    static async delete(id){
        try {
            await db.query('DELETE FROM blogs WHERE id = ?', [id]);
        } catch (error) {
            console.error('Error in delete blog: ', error);
            throw error;
        }
    }
}

module.exports = Blog;