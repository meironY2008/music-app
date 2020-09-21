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
                <div key={playlist.Playlist_id}>
                    <Link to={`/playlists/${playlist.Playlist_id}`} className='playlistLink'>
                        <div className='playlistImageContainer'>
                            <img src={playlist.Cover_img} alt={playlist.Playlist_Name} className='playlistImage' />
                        </div>
                        <div className='playlistName'>{playlist.Playlist_Name}</div>
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