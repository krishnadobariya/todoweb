const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/${process.env.DATABASE}`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database Connected');
}).catch((err) => {
    console.log(`Access Denied`, err);
})