require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./src/routes/index');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

/*Routes*/
app.use('/posts', routes.posts);
app.use('/session', routes.session);


const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

