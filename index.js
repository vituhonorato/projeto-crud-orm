//IMPORTS
const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const pessoas = require('./routes/pessoas')
const model = require('./models/index')
const bodyParser = require('body-parser')


//STATIC FILES
app.use(express.static('public'))
app.use(express.static(__dirname +"public/css"));
app.use(express.static(__dirname +"public/js"));
app.use(express.static(__dirname +"public/img"));

app.use(bodyParser.urlencoded({extended: true}))


//configuração responsável por direcionar consulta a pasta view ao tipo de arquivo ejs TEMPLATE ENGINE 
app.set('views', path.join(__dirname, 'views'))
app.set('view engine','ejs')





//NAVIGATION
app.get('/', (req, res) => res.render('index'))
app.use('/pessoas', pessoas)




//LISTEN PORT...  usar o force:true pra atualizar tabela
model.sequelize.sync({force: true}).then(() => {
    app.listen(port, () => console.log('CRUD-ORM Listening...'))
})
