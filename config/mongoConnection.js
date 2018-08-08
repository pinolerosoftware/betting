const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/betting', function(error){
    if(error) console.log(error);
});
module.exports = mongoose;