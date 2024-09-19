const mongoose = require('mongoose');

const url = `mongodb+srv://gaurav0110503:dl4ch0628@cluster0.nis28af.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log('Connected to DB')).catch((e)=> console.log('Error', e))