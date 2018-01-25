const express = require('express'),
    hbs = require('hbs'),
    fs = require('fs');

var app = express();
var maintenance_flag = false;

const port = process.env.port;

//using partials
hbs.registerPartials(__dirname + '/views/partials');
// hbs.registerHelper('screamIt', (text) => {
//     return text.toUpperCase();
// });

//middle ware 
app.set('view engine','hbs');
//log
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}\n`;

    fs.appendFile('nodeserver.log', log, (err) =>{
        if(err) console.log('Unable to append log to the file');
    });
    next();
});

if(maintenance_flag){
    app.use((req, res, next) => {
        res.render('maintenance.hbs');
    });
}

app.get('/', (req, res)=>{
    let welcomemsg ='Welcome to the website of the Sehun node project';
    let pageTitle = 'Home Page';
    res.render('home.hbs',{
        welcomemsg,
        pageTitle
    })
});

app.get('/about', (req, res)=>{
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/*', (req, res)=>{
    res.status(404).send('Page Not found');
});

//using heroku port
app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});
