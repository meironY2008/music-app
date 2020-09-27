import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';
import './Home.css';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';

export default function Home() {

    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);

    const showTopSongs = async () => {
        const { data } = await axios.get('/top/songs');
        const songsArr = data.map(song => {
            return (
                <div key={song.id}>
                    <Link to={`/songs/${song.id}`} className='carouselLink'>
                        <div className='song-icon-container'>
                            <LibraryMusicSharpIcon style={{height: "100px", width: "100px", margin: "1.5rem"}} />
                        </div>
                        <div className ='carousel-text'>{song.title}</div>
                    </Link>
                </div>
            )
        });
        setTopSongs(songsArr);
    }

    const showTopAlbums = async () => {
        const { data } = await axios.get('/top/albums');
        const albumsArr = data.map(album => {
            return (
                <div key={album.id}>
                    <Link to={`/albums/${album.id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={album.coverImg}/>
                        </div>
                        <div className ='carousel-text'>{album.albumName}</div>
                    </Link>
                </div>
            );
        });
        setTopAlbums(albumsArr);
    }

    const showTopArtists = async () => {
        const { data } = await axios.get('/top/artists');
        const artistsArr = data.map(artist => {
            return (
                <div key={artist.id}>
                    <Link to={`/artists/${artist.id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={artist.coverImg}/>
                        </div>
                        <div className ='carousel-text'>{artist.artistName}</div>
                    </Link>
                </div>
            )
        });
        setTopArtists(artistsArr);
    }

    const showTopPlaylists = async () => {
        const { data } = await axios.get('/top/playlists');
        const playlistsArr = data.map(playlist => {
            return (
                <div key={playlist.id}>
                    <Link to={`/playlists/${playlist.id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={playlist.coverImg}/>
                        </div>
                        <div className ='carousel-text'>{playlist.playlistName}</div>
                    </Link>
                </div>
            )
        });
        setTopPlaylists(playlistsArr);
    }

    useEffect(() => {
        showTopSongs();
        showTopAlbums();
        showTopArtists();
        showTopPlaylists();
    }, []);

    return (
        <div className='carousel'>
            <h3>Featured Songs</h3>
            <Carousel
            className='carousel-item'
            itemsToShow={5}
            itemsToScroll={1}
            >
                {topSongs}
            </Carousel>
            <br />
            <h3>Featured Albums</h3>
            <Carousel
            className='carousel-item'
            itemsToShow={5}
            itemsToScroll={1}
            >
                {topAlbums}
            </Carousel>
            <br />
            <h3>Featured Artists</h3>
            <Carousel
            className='carousel-item'
            itemsToShow={5}
            itemsToScroll={1}
            >
                {topArtists}
            </Carousel>
            <br />
            <h3>Featured Playlists</h3>
            <Carousel
            className='carousel-item'
            itemsToShow={5}
            itemsToScroll={1}
            >
                {topPlaylists}
            </Carousel>
        </div>
    )
}