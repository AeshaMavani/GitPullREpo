const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import routes
const userRoutes = require('./routes/user');

//Environment variable or you can say constants
env.config();

//mongoodb connection
// mongodb+srv://Aesha:<password>@cluster0.k807u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.k807u.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});

//Add Middleware to pass the data 
// app,use(express.json());
// app.use(bodyParser());
app.use('/api', userRoutes);

// app.get('/', (req, res, next) => {
//     res.status(200).json({
//         message: 'Hello From Server'
//     });
// });

// app.post('/data', (req, res, next) => {
//     res.status(200).json({
//         message: req.body
//     });
// });

app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
}); 