
require('dotenv').config()


const app = require('./app')
const port = process.env.APP_PORT || 8080
app.listen(port, ()=>{
    console.log('Backend started in '+ process.env.NODE_ENV + ' on port '+ port +'.')
})

module.exports = app