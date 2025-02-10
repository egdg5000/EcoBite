const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000



//Routes
app.use("/users", require("./routes/users.js"));


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})
