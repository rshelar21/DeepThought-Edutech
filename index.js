const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const db = require('./config/mongoDB')
const eventRouter = require('./Router/event')


app.use(express.json());    // To parse the incoming requests with JSON payloads
app.use(express.urlencoded({ extended: false })); // To parse the incoming requests with urlencoded payloads
app.use("/api/v3/app", eventRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})