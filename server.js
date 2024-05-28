const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const apiRouter = require('./routes');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use('/api', apiRouter);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})