import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideSongs from './SideSongs';
import { Link } from 'react-router-dom';
import './SongPage.css';

export default function SongPage({ match, location }) {

    const [songInfo, setSongInfo] = useState([]);
    const [artistImg, setArtistImg] = useState('');
    const [albumImg, setAlbumImg] = useState('');

    const showSongInfo = async () => {
        const { data } = await axios.get(`/songs/${match.params.id}`);
        console.log(data);
        setSongInfo(data);
        const album = await axios.get(`/albums/${data.albumId}`);
        setAlbumImg(
                <Link to={`/albums/${data.albumId}`} className='songPageLink'>
                    <div className='song-info-image-container'>
                        <img src={album.data.album.coverImg} alt={album.data.album.albumName} className='song-info-image' />
                    </div>
                    <div className='song-info-title'> {album.data.album.albumName} </div>
                </Link>
        );
        const artist = await axios.get(`/artists/${data.artistId}`);
        setArtistImg(
                <Link to={`/artists/${data.artistId}`} className='songPageLink'>
                    <div className='song-info-image-container'>
                        <img src={artist.data.artist.coverImg} alt={artist.data.artist.artistName} className='song-info-image' />
                    </div>
                    <div className='song-info-title'> {artist.data.artist.artistName} </div>
                </Link>
        );
    }

    useEffect(() => {
        showSongInfo()
    }, [location]);

    return (
        <div>
            <h1 id='songTitle'>{songInfo.title}</h1>
            <div id='songPageWrapper'>
                <section id='info-section'>
                    <h3 id='info'>Info</h3>
                    <div id='info-images-container'>
                        <div>{artistImg}</div>
                        <div>{albumImg}</div>
                    </div>
                </section>
                <div>
                    <iframe id='media' width="300" height="300" src={songInfo.youTube} frameBorder='0'></iframe>
                </div>
                <section id='side-songs-section'>
                    <h3 id='more-songs'>More Songs...</h3>
                    <SideSongs query={location.search} idParam={match.params.id} />
                </section>
            </div>
        </div>
    )
}