import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import lengthTime from '../function/lengthTime';


export default function SideSongs({ query, idParam }) {

    const [list, setList] = useState([]);


    const showList = async () => {
        if (query) {
            const { data } = await axios.get(`/songs/${idParam}${query}`);
            setList(data.map(song => {
                return (
                    <div key={song.songId}>
                        <Link to={`/songs/${song.songId}${query}`} className='side-song-link'>
                            <div className='side-song-title-container'>
                                <span className='side-song-title'>
                                    <LibraryMusicSharpIcon />
                                    <span style={{marginLeft: "5px"}}>{song.title}</span>
                                </span>
                                <span style={{fontSize: "0.8em"}}>{lengthTime(song.length)}</span>
                            </div>
                        </Link>
                    </div>
                );
            }))
        } else {
            const { data } = await axios.get('/songs');
            setList(data.filter(song => song.songId != idParam)
                .map(song => {
                    return (
                        <div key={song.songId}>
                            <Link to={`/songs/${song.songId}`} className='side-song-link'>
                                <div className='side-song-title-container'>
                                    <span className='side-song-title'>
                                        <LibraryMusicSharpIcon />
                                        <span style={{marginLeft: "5px"}}>{song.title}</span>
                                    </span>
                                    <span style={{fontSize: "0.8em"}}>{lengthTime(song.length)}</span>
                                </div>
                            </Link>
                        </div>
                    );
                }))
        }
    }

    useEffect(() => {
        showList()
    }, [idParam])

    return (
        <div id='side-songs-container'>
            {list}
        </div>
    )
}