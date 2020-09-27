import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './Artists.css';

export default function Artists() {

    const [artists, setArtists] = useState([]);
    
    const showArtists = async () => {
        const { data } = await axios.get('/artists');
        const artistsArr = data;
        setArtists(artistsArr.map(artist => {
            return (
                <div key={artist.artistId}>
                    <Link to={`/artists/${artist.id}`} className='artistLink'>
                        <div className='artistImageContainer'>
                            <img src={artist.coverImg} alt={artist.artistName} className='artistImage' />
                        </div>
                        <div className='artistName'>{artist.artistName}</div>
                    </Link>
                </div>
            );
        }));
    }

    useEffect(() => {
        showArtists()
    }, []);
    
    return (
        <div className='artistContainer'>
            {artists}
        </div>
    )
}