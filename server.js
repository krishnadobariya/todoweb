const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
require('dotenv').config();
const app = express();

//models
const list = require('./models/list');

//port
const PORT = process.env.PORT;

//databse
require('./db/conn');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

//view engine configuration
app.set('view engine', 'ejs');

//GET method
app.get('/', (req, res) => {
    list.find({}, (err, tasks) => {
        res.render('todo', {
            task: tasks
        })
    })
});

//POST Method
app.post('/', async(req, res) => {
    console.log(req.body);

    const task = new list({
        content: req.body.content
    });
    try {
        await task.save();
        res.redirect('/');
    } catch (err) {
        res.redirect('/');
    }
})

//UPDATE method
app
    .route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        list.find({}, (err, tasks) => {
            res.render('edit', {
                task: tasks,
                idTask: id
            })
        })
    })

.post((req, res) => {
    const id = req.params.id;

    list.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);

        res.redirect('/');
    })
})

//DELETE Method
app.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    list.findByIdAndRemove(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

app.listen(PORT, () => {
    console.log(`Server Runnig At Port : ${PORT}`);
})