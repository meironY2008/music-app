import React,{useEffect,useState} from 'react';
import axios from 'axios';


export default function  Artists() {

    const[artists,setArtists]=useState([]);

    const artistsShow = async () =>{
        const artistsArr =await( await axios.get('/artists')).data;
        console.log(artistsArr);
        setArtists( artistsArr.map(artist => {
           return <li key={artist.id}>{artist.Name}</li>;
        }) )  
    }

    useEffect(() => {
        artistsShow()
    }, [])

    return (
        <div >
            <ol>
                {artists}
            </ol>
        </div>
    )
}
