import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import './Songs.css';
import lengthTime from '../function/lengthTime';

export default function Songs() {

    const [songs, setSongs] = useState([]);
    // const lengthTime = (length)=>{
    //      let second = length%60;
    //      let minute =Math.floor( length/60);
    //      if(second < 10){
    //          second="0"+second;
    //      }
    //      if(minute < 10){
    //          minute="0"+minute;
    //      }
    //      let lengthStr=minute+':'+second;
    //      return lengthStr;
    // }

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data;
        setSongs(songsArr.map(song => {
            return (
            <div key={song.songId}>
                <Link to={`/songs/${song.id}`} className='songLink'>
                    <div className='song-title-container'>
                        <span className='song-title'>
                            <LibraryMusicSharpIcon />
                            <span style={{marginLeft: "5px"}}>{song.title}</span>
                        </span>
                        <span style={{fontSize: "0.8em"}}>{lengthTime(song.length)}</span>
                    </div>
                </Link>
            </div>
            )
        }));
    }

    useEffect(() => {
        showSongs()
    }, []);
    
    return (
        <div className='song-container'>
            {songs}
        </div>
    )
}