import React,{useEffect,useState} from 'react';
import axios from 'axios';


export default function  Songs() {

    const[songs,setSongs]=useState([]);

    const songsShow = async () =>{
        const songArr =await( await axios.get('/songs')).data;
        setSongs( songArr.map(song => {
           return <li className='song-li' key={song.id}>{song.Title}</li>;
        }) )  
    }

    useEffect(() => {
        songsShow()
    }, [])

    return (
        <div >
            <ul>
                {songs}
            </ul>
        </div>
    )
}
