import React,{useEffect,useState} from 'react';
import axios from 'axios';


export default function  Albums() {

    const[albums,setAlbums]=useState([]);

    const albumsShow = async () =>{
        const albumsArr =await( await axios.get('/albums')).data;
        console.log(albumsArr);
        setAlbums( albumsArr.map(album => {
           return <li key={album.id}>{album.Name}</li>;
        }) )  
    }

    useEffect(() => {
        albumsShow()
    }, [])

    return (
        <div >
            <ol>
                {albums}
            </ol>
        </div>
    )
}
