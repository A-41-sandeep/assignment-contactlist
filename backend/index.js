import express from 'express'
import cors from 'cors'
import mysql from 'mysql'

const app=express();
app.use(cors());
app.use(express.json());

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"contactsbook"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database: ', err);
        return;
    }
    console.log('Connected to MySQL database...');
});

app.get('/',(req,res)=>{
    const sql="SELECT * FROM contactslist";
    db.query(sql,(err,result)=>{
        if(err) return res.json({Message:'error at server'});
        return res.json(result);
    })
})

app.post('/addcontact',(req,res)=>{
    const sql="insert into contactslist (firstname,middlename,lastname,phone1,phone2,email,address) values (?)";
    const values=[
        req.body.firstname,
        req.body.middlename,
        req.body.lastname,
        req.body.phone1,
        req.body.phone2,
        req.body.email,
        req.body.address,
    ]
    db.query(sql,[values],(err,result)=>{
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.get('/getContact/:id',(req,res)=>{
    const sql="SELECT * FROM contactslist WHERE sno= ?";
    const id=req.params.id;

    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Message:"error inside server"});
        return res.json(result);
    })
})

app.put("/edit/:id",(req,res)=>{
    const sql="UPDATE contactslist SET `firstname`=?,`middlename`=?,`lastname`=?, `phone1`=?,`phone2`=?,`email`=?,`address`=? WHERE sno=?";
    const id=req.params.id;
    db.query(sql,[req.body.firstname,req.body.middlename,req.body.lastname,req.body.phone1,req.body.phone2,req.body.email,req.body.address,id],(err,result)=>{
        if(err) return res.json({Message:'error inside server'});
        return res.json(result);
    })
})

app.delete('/delete/:id',(req,res)=>{
    const sql="DELETE FROM contactslist WHERE sno=?";
    const id=req.params.id;
    db.query(sql,[id],(err,result)=>{
        if(err) return res.json({Messsage:"error inside error"});
        return res.json(result);
    })
})

app.get('/search', (req, res) => {
    const { query } = req.query;
    const sql = `
      SELECT * 
      FROM contactslist 
      WHERE 
        firstname LIKE '%${query}%' OR 
        middlename LIKE '%${query}%' OR 
        lastname LIKE '%${query}%' OR 
        phone1 LIKE '%${query}%' OR 
        phone2 LIKE '%${query}%' OR 
        email LIKE '%${query}%' OR 
        address LIKE '%${query}%'
        ORDER BY
        firstname ASC, 
        middlename ASC, 
        lastname ASC;`;
  
    db.query(sql, (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database');
      } else {
        res.status(200).json(result);
      }
    });
  });



app.listen(8081,()=>{
    console.log("server running 8081");
})