const express = require('express')
const app = express()
const hbs = require('hbs')
const fs = require('fs')

const port = process.env.PORT || 3000

// tell Handlebars where the directory of included files is
hbs.registerPartials(__dirname + '/views/partials')

// tell Express to use Handlebars for rendering templates
app.set('view engine', 'hbs')

// tell Express to serve a folder full of static files
app.use(express.static(__dirname + '/public'))

// write a log file as middleware
app.use((req, res, next) => {
  let logEntry = `${new Date().toString()}: ${req.method}  ${req.url}`
  console.log(logEntry)
  fs.appendFile('server.log', logEntry + '\n', (err) => {
    if (err) console.log('Can not write to log file')
  })
  next()
})


// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// functions for Handlebars that can be called in the templates
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

// route for Home Page
app.get('/', (req, res) =>
  res.render('index.hbs', {
    pageTitle: 'Home page',
    welcomeMessage: 'Thanks for visiting!'
  })
)

// route for About Page
app.get('/about', (req, res) =>
  res.render('about.hbs', {
    pageTitle: 'About page'
  })
)

// get the Express server going
app.listen(port, () => console.log(`Listening on port ${port}...`))
