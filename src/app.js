const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Wheather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',  
        name: 'Andrew Mead'
    })
})

app.get('/wheater', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')
// const geocode = require('./utils/geocode')
// const forecast = require('./utils/forecast')
// const request = require('postman-request')

// const app = express()
// // define paths for express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')


// //setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// //setup static directory to serve
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather App index',
//         name: 'zidandex'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'zidanebout'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helptext: 'this is koupet help',
//         title: 'help',
//         name: 'zidanhelp'

//     })
// })

// app.get('/wheather', (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'lu harus masukin sebuah lokasi dulu'
//         })
//     }

//     geocode(req.query.address, (error, { latitude, longitude, location }) => {
//         if (error) {
//             return req.send({ error })
//         }

//         forecast(latitude, longitude, (error, forecasData) => {
//             if ( error ) {
//                 return res.send({ error })
//             }
        
//             res.send({
//                 forecas: forecasData,
//                 location,
//                 address: req.query.address
//             })
//         })
//     })
// })


// //     res.send({
// //         forecast: 'it is snwo',
// //         location: 'Philadelphia',
// //         address: req.query.address
// //     })
// // })


// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'you mysh provide sreach term'
//         })
//     }

//     console.log('req.query.search')
//     res.send({
//         products: []
//     })
// })

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'zidan404',
//         errorMessege: 'help page laka'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'zidan',
//         errorMessege: 'halaman ora ketemu ngab'
//     })
// })




// app.listen(3000, () => {
//     console.log('server keluar')
// })
