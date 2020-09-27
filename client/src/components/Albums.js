import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Albums.css';

export default function Albums() {

    const [albums, setAlbums] = useState([]);
    
    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data;
        setAlbums(albumsArr.map(album => {
            return (
                <div key={album.id}>
                    <Link to={`/albums/${album.id}`} className='albumLink'>
                        <div className='albumImageContainer'>
                            <img src={album.coverImg} alt={album.albumName} className='albumImage' />
                        </div>
                        <div className='albumName'>{album.albumName}</div>
                    </Link>
                </div>
            );
        }));
    }

    useEffect(() => {
        showAlbums()
    }, []);
    
    return (
        <div className='albumContainer'>
            {albums}
        </div>
    )
}