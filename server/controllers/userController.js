
const {Resume,userDetails}=require('../database/resume')

const userStoreDetails=async(req,res)=>{
  const { resumeId, formData } = req.body.data;
  //console.log(req.body.data.formData)
  try {
    const updatedResume = await userDetails.findOneAndUpdate(
      { resumeId },
      { $set: formData },
      { new: true, upsert: true, runValidators: true }  // upsert: true will create a new document if it doesn't exist
    );
    res.status(200).json({ message: 'Resume updated successfully', data: updatedResume });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const userResume = async (req, res) => {
  try {
    const { title, resumeId, userEmail, userName } = req.body.data;

    //console.log('Incoming data:', { title, resumeId, userEmail, userName });

    const existingResume = await Resume.findOne({ userEmail });

    if (existingResume) {
      console.log('Existing resume found:', existingResume);

      // Check if resumeId already exists in the array
      if (!existingResume.resumeIds.includes(resumeId)) {
        existingResume.resumeIds.push(resumeId);
        existingResume.titles.push(title)
        const updatedResume = await existingResume.save();
        console.log('Updated resume:', updatedResume);
        res.status(200).json(updatedResume);
      } else {
        console.log('Resume ID already exists in the array');
        res.status(200).json(existingResume);
      }
    } else {
      // Create a new resume document
      const newResume = new Resume({
        titles:[title],
        resumeIds: [resumeId], // Initialize the array with the new resumeId
        userEmail,
        userName
      });
      const savedResume = await newResume.save();
      console.log('Created new resume:', savedResume);
      res.status(201).json(savedResume);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const handleDelete=async (req,res)=>{
  try {
    const { resumeId, title, userEmail } = req.body;
    const resume = await Resume.findOne({ userEmail });
    //console.log(resumeId,title,userEmail)
    if(resume)
    {
      if(resume.resumeIds.includes(resumeId) && resume.titles.includes(title))
      {
        await userDetails.deleteOne({resumeId})
        
        resume.resumeIds = resume.resumeIds.filter(id => id !== resumeId);
        resume.titles = resume.titles.filter(t => t !== title);

        await resume.save();

        res.status(200).json({ message: 'Resume deleted successfully' });
      }else {
        res.status(404).json({ message: 'ResumeId or title not found' });
      }
    }else {
      res.status(404).json({ message: 'Resume not found' });
    }
  } catch (error) {
    res.status(400).json({message:error})
  }
}


const getResumeInfo=async(req,res)=>{
  const { resumeId } = req.query; 

  if (!resumeId) {
    return res.status(400).json({ message: 'Resume ID is required' });
  }

  try {
    const resume = await userDetails.findOne({ resumeId });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.status(200).json(resume);
  }catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const getResumeList=async(req,res)=>{
    const {email}=req.body
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const resume = await Resume.find({userEmail: email})
    if (resume) {
        res.status(200).json(resume);
    } else {
        res.status(404).json({ error: 'Resume not found' });
    }
}

module.exports={userResume,getResumeList,userStoreDetails,getResumeInfo,handleDelete}