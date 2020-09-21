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
        // console.log(data);
        setSongInfo(...data);
        const album = await axios.get(`/albums/${data[0].Album_id}`);
        setAlbumImg(
                <Link to={`/albums/${data[0].Album_id}`} className='songPageLink'>
                    <div className='song-info-image-container'>
                        <img src={album.data[0].Cover_img} alt={album.data[0].Album_Name} className='song-info-image' />
                    </div>
                    <div className='song-info-title'> {album.data[0].Album_Name} </div>
                </Link>
        );
        const artist = await axios.get(`/artists/${data[0].Artist_id}`);
        setArtistImg(
                <Link to={`/artists/${data[0].Artist_id}`} className='songPageLink'>
                    <div className='song-info-image-container'>
                        <img src={artist.data[0].Cover_img} alt={artist.data[0].Artist_Name} className='song-info-image' />
                    </div>
                    <div className='song-info-title'> {artist.data[0].Artist_Name} </div>
                </Link>
        );
    }


    useEffect(() => {
        showSongInfo()
    }, [location]);

    const fullScreen = () => {
        const elem = document.querySelector('.media');
        // elem.webkitRequestFullScreen();
        // const dbclick = setInterval(() => { elem.click(); console.log('boo') }, 200);
        // setTimeout(() => clearInterval(dbclick), 1000);
    }

    return (
        <div>
            {/* Title: {songInfo.Title} <br /> */}
            {/* Artist: <Link to={`/artists/${songInfo.Artist_id}`}> {songInfo.Artist_Name} </Link><br /> */}
            {/* Album: <Link to={`/albums/${songInfo.Album_id}`}> {songInfo.Album_Name} </Link><br /> */}
            {/* Album: <Link to={`/albums/${songInfo.Album_id}`}> <img src={albumImg} /> </Link><br /> */}
            {/* <iframe onLoad={() => fullScreen()} className='media' src={songInfo.Youtube} frameBorder="0" allow="autoplay"></iframe><br /> */}
            {/* Length: {songInfo.Length}<br /> */}
            {/* Lyrics: {songInfo.Lyrics} */}
            <h1 id='songTitle'>{songInfo.Title}</h1>
            <section id='info-section'>
                <h3 id='info'>Info</h3>
                <div id='info-images-container'>
                    <div>{artistImg}</div>
                    <div>{albumImg}</div>
                </div>
            </section>
            <SideSongs query={location.search} idParam={match.params.id} />
        </div>
    )
}