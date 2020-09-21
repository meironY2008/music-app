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
                <div key={artist.Artist_id}>
                    <Link to={`/artists/${artist.Artist_id}`} className='artistLink'>
                        <div className='artistImageContainer'>
                            <img src={artist.Cover_img} alt={artist.Artist_Name} className='artistImage' />
                        </div>
                        <div className='artistName'>{artist.Artist_Name}</div>
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