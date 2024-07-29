const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB');
  }).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

const resumeSchema = new Schema({
  titles: [String],
  resumeIds: [String],
  userEmail: String,
  userName: String
}, { timestamps: true }); 


const formFieldSchema = new Schema({
  title: {
    type: String,
  },
  companyName: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  workSummery: {
    type: String,
  },
});

const educationFieldSchema=new Schema({
  universityName:{
    type:String
  },
  degree:{
    type:String
  },
  major:{
    type:String
  },
  startDate:{
    type:String
  },
  endDate:{
    type:String
  },
  description:{
    type:String
  }
})

const skillFieldSchema=new Schema({
  name:{
    type:String
  }
})

const userResumeDetails=new Schema({
  userEmail: {
    type: String,
    required: true, 
  },
  resumeId: {
    type: String,
    required: true,
  },
  firstName:{
  type:String,
},
lastName:{
  type:String,
},
address:{
  type:String
},
jobTitle:{
  type:String,
},
phone:{
  type:String,
},
email:{
  type:String
},
linkedin:{
  type:String
},
gfg:{
  type:String
},
github:{
  type:String
},
summary:{
  type:String
},
  experiences: [formFieldSchema],
  educations:[educationFieldSchema],
  skills:[skillFieldSchema]
})

const Resume = mongoose.model('Resume', resumeSchema);
const userDetails=mongoose.model('userDetails',userResumeDetails)
module.exports = {Resume,userDetails};

// firstName:{
//   type:String,
// },
// lastName:{
//   type:String,
// },
// jobTitle:{
//   type:String,
// },
// phone:{
//   type:String,
// },
// email:{
//   type:String
// }