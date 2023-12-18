const mongoose = require('mongoose');

const schoolSchema = new mongoose.Schema({
     name: String,
     status: String,
     startTime: String,
     endTime: String,
     shift: String,
     address: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Address',

     }
     ,
     hasProjector: Boolean,
     hasLaptop: Boolean,
     organization: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Organization',
     },
});

module.exports = mongoose.model('School', schoolSchema);
