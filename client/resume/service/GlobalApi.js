import axios from 'axios';

const axiosClient=axios.create({
    baseURL:'http://localhost:3000',
    headers:{
        'Content-Type':'application/json'
    }
})

const userResume = {
    CreateNewResume: (data) => axiosClient.post('/api/user-resume', data),
  };

const getUserResume = {
    getResume: (userEmail)=>axiosClient.post('/api/user',{ email: userEmail })
};

const updateResumeDetail={
    update:(resumeId,data)=>axiosClient.put('/api/user-resume/user-data',{ data: { resumeId, ...data } })
};

const getResumeDetail={
    getResumeInformation:(resumeId)=>axiosClient.get('api/user-resume/get-data',{params: { resumeId }})
}
const deleteResumeDetail={
    deleteResume:(data)=>axiosClient.post('/api/user-resume/del',data)
}

export { userResume, getUserResume,updateResumeDetail,getResumeDetail ,deleteResumeDetail};