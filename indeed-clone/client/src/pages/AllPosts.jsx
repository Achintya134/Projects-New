



import { useEffect, useState } from "react";
import Header from "../component/Header";
import { getAllPosts} from "../services/api";
import {Box, Typography, InputBase,styled,Card, CardContent } from'@mui/material'



const SearchWrapper = styled(Box)({
    marginTop:74,
    display: 'flex',
    justifyContent:'center',
    '& > div': {
        width: 500,
        height: 45,
        border: '1px solid #767676',
        borderRadius: 10,
        display:'flex',
        alignItems:'center',
        marginRight: 20,
        paddingLeft: 10

    }

})

const PostWrapper = styled(Box)({
    marginTop:50,
    display: 'flex',
    justifyContent:'center',
    flexWrap:'wrap',
    '& > div': {
        width: '30%',
        height: 300,
        border: '1px solid #442d0',
        borderRadius: 10,
        align:'left',
        margin: 10


    }

})


const AllPosts = () => {

    
    const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    useEffect(() => {

        const getData = async () => {
            const response = await getAllPosts();
            console.log(response.data)
            setPosts(response.data);
            console.log(posts);
        }
        getData();

    }, [])

    return(
        <>
            <Header/>
            <SearchWrapper>
                <InputBase 
                placeholder="Search by Job title"
                onChange={(e)=> setText(e.target.value)}
                ></InputBase>
            </SearchWrapper>
            <PostWrapper>
                {
                    posts.filter(post => post.profile.toLowerCase().includes(text.toLowerCase())).map(post => (
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{post.profile}</Typography>
                                <Typography>{post.type === "Offline" ? "Remote" : "Office"}</Typography>
                                <Typography
                                    style={{color:'#6f6f6f', margin:'10px 0'}}
                                >{post.description.length>150?post.description.substring(0,150)+"...":post.description}</Typography>
                                <Typography>{post.technology}</Typography>
                                <Typography>posted on {new Date(post.createdAt).toLocaleDateString()}</Typography>

                            </CardContent>
                        </Card>
                    ))

                }
            </PostWrapper>
        </>
    )
} 

export default AllPosts;