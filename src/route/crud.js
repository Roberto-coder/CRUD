const express = require('express');
const router = express.Router();
//var socket = io.connect('localhost:6646/STAR/add', { 'forceNew': true });

const pool = require('../db');//Aqui se manda a llamar la bd

router.get('/add', async(req , res) =>{
    //res.send('Listo');
    const articulo = await pool.query('SELECT * FROM articulo');
    res.render('partial/index', {articulo});
    
});

router.post('/addarticulo',  async(req , res) => {
    const {nombre, img, categoria, descripcion} = req.body;
    const newArticulo = {
        nombre,
        img,
        categoria,
        descripcion,
    };   
    console.log(newArticulo);
    await pool.query('INSERT INTO articulo set ?', [newArticulo]);
    //res.send('Guardado en MySQL');
    res.redirect('/STAR/add');
});

router.get('/delete/:id', async(req,res)=>{
    const {id} = req.params;
    await pool.query('DELETE FROM articulo WHERE id = ?', [id]);
    res.redirect('/STAR/add');
});
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const articulos = await pool.query('SELECT * FROM articulo WHERE id =?', [id]);
    res.render('partial/edit', {articulo: articulos[0]});
});

router.post('/edit/:id', async (req, res) => {
    const {nombre, img, categoria, descripcion} = req.body;
    const {id} = req.params;
    const newArticulo = {
        nombre,
        img,
        categoria,
        descripcion,
    };
    await pool.query('UPDATE  articulo set ? WHERE id = ?', [newArticulo, id]);
    res.redirect('/STAR/add');//'/STAR/add'
    const articulo = await pool.query('SELECT * FROM articulo');
    
    res.render('partial/index', {articulo});
});

router.post('/quaryarticulo',  async(req , res) => {
    const {nombre} = req.params;
    const nombre = await pool.query('SELECT * FROM articulo where nombre = ?');
    const where = 'where 1=1'
    if(nombre!=null){
        nombre=this.mysql_real_scape_string(nombre);
        where=where+" and nombre={nombre} ";
    }
    res.render('partial/index', {nombre});
});

module.exports = router;