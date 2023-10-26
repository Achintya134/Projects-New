







import Header from "../component/Header"; 
import {Box, Typography, styled, TextField,Button} from '@mui/material'
import Dropdown from "../component/Dropdown";
import { useState } from "react";

import { savePost } from "../services/api";

import { useNavigate } from "react-router-dom";

import { routePath } from "../route";

const Component = styled(Box)({
    padding: '80px 200px',
    background: '#F5F5F5'

})

const Container = styled(Box)({
    display:'flex',
    backgroundColor: '#FFFFFF',
    borderRadius:20,
    justifyContent:'space-between',
    alignItems:'center',
    padding: '0 70px',
    '& > p':{
        fontsize: 35,
        fontWeight: 700,
        opacity: '.7',

    }
})

const FormWrapper = styled(Box)({
    display:'flex',
    flexDirection:'column',
    margintop: 20,
    padding: 20,
    background: '#FFFFFF',
    borderRadius:20,
    '& > *':{
        marginTop: '20px !important',
    }

})

const defaultObj = {
    profile: "",
    type: "",
    description: "",
    experience:"",
    technology:[],
    salary:""
}

const options = {
    type:["Online", "Offline"],
    experience: ["0-2 years", "3-5 years", "5-8 years","8-10 years","10-15 years"],
    technology:["Java", "Javascript","Angular","React","Node.js","Docker", "AWS", "HTML", "CSS","Python"],
    salary:["$30000-$50000","$50000-$80000","$80000-$100000","$100000-$120000","$120000-$150000"]
}

const CreatePost = () =>{

    const navigate=useNavigate();
    const [data, setData] = useState(defaultObj)
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH3zkKYlIHjjoQrE4e-a5xiJIaK0reWlcDhewsx8rjV87d8M82";

    const handleChange = (e) => {
            setData({ ...data, [e.target.name]: e.target.value });
    }

    const saveJob = async () => {
        await savePost(data);
        navigate(routePath.post);

    }

    return(
        <>
            <Header/>
            <Component>
                <Container>
                    <Typography>Create a Job Post</Typography>
                    <img src={image} alt='create'/> 

                </Container>
                <FormWrapper>
                    <TextField
                        placeholder="Job Title"
                        name="profile"
                        onChange={handleChange}
                    ></TextField>
                    <Dropdown
                        label="Job Type"
                        id="job-type-options"
                        value={data.type}
                        name="type"
                        handleChange={handleChange}
                        options={options.type} 
                    />
                    <TextField
                        placeholder="Job Description"
                        name="description"
                        onChange={handleChange}
                    ></TextField>
                    <Dropdown
                        label="Experience"
                        id="job-experience-label"
                        value={data.experience}
                        name="experience"
                        handleChange={handleChange}
                        options={options.experience}
                    />
                    <Dropdown
                        label="Technology"
                        id="job-technology-label"
                        value={data.technology}
                        name="technology"
                        handleChange={handleChange}
                        options={options.technology}
                        multiple

                    />
                    <Dropdown
                        label="Salary"
                        id="job-salary-label"
                        value={data.salary}
                        name="salary"
                        handleChange={handleChange}
                        options={options.salary}
                    />
                    <Button variant="contained" onClick={()=>saveJob()}>Save Job</Button>

                </FormWrapper>
            </Component>
        </>
    )
}

export default CreatePost;


