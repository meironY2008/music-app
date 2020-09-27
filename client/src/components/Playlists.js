import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Playlists.css';

export default function Playlists() {

    const [playlists, setPlaylists] = useState([]);

    const showPlaylists = async () => {
        const { data } = await axios.get('/playlists');
        const playlistsArr = data;
        setPlaylists(playlistsArr.map(playlist => {
            return (
                <div key={playlist.id}>
                    <Link to={`/playlists/${playlist.id}`} className='playlistLink'>
                        <div className='playlistImageContainer'>
                            <img src={playlist.coverImg} alt={playlist.playlistName} className='playlistImage' />
                        </div>
                        <div className='playlistName'>{playlist.playlistName}</div>
                    </Link>
                </div>
            );
        }));
    }

    useEffect(() => {
        showPlaylists();
    }, []);
    
    return (
        <div className='playlistsContainer'>
            {playlists}
        </div>
    )
}