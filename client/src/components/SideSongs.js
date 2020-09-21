import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function SideSongs({ query, idParam }) {

    const [list, setList] = useState([]);

    const showList = async () => {
        if (query) {
            const { data } = await axios.get(`/songs/${idParam}${query}`);
            setList(data.map(song => <div className='listItem' key={song.Song_id}><Link to={`/songs/${song.Song_id}${query}`}>{song.Title}</Link></div>))
        } else {
            const { data } = await axios.get('/songs');
            setList(data.filter(song => song.Song_id != idParam)
                .map(song => <div className='listItem' key={song.Song_id}><Link to={`/songs/${song.Song_id}`}>{song.Title}</Link></div>))
        }
    }

    useEffect(() => {
        showList()
    }, [idParam])

    return (
        <div className='list'>
            List of side songs: {list}
        </div>
    )
}