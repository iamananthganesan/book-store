import express, { json } from 'express'
import mysql2 from 'mysql2';

const PORT = 8000;
const app = express()
//Create database connection 
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Admin@123',
    database: 'dummy'
})

app.use(express.json())

app.get('/', (req, res) => {
    res.json('Hello from backend')
})
//GET list of books
app.get('/books', (req, res)=>{
    const qu = 'SELECT * FROM books';
    db.query(qu, (err, data)=>{
        if(err){ return res.json(err)}
        return res.json("New book record has been added successfully!!!")
    })
})

app.post('/bookList', (req,res)=>{
    const qu = "INSERT INTO books (title,desc,cover) VALUES (?)";
    const values = [req.body.title, req.body.desc, req.body.cover];
    console.log('values', values)
    db.query(qu,values,(err,data) =>{
        if(err) {
            return res.json(err)
        }
        return res.json(data)
    })
})



app.listen(PORT, () => {
    console.log(`server is running in ${PORT} port`);
})