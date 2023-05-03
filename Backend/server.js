const app = require('./index')
const port = 80;

app.listen(port, function(){
    console.log(`Server Started on port ${port}`);
})