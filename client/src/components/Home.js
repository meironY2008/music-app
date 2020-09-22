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
                <div key={song.Song_id}>
                    <Link to={`/songs/${song.Song_id}`} className='carouselLink'>
                        <div className='song-icon-container'>
                            <LibraryMusicSharpIcon style={{height: "100px", width: "100px", margin: "1.5rem"}} />
                        </div>
                        <div className ='carousel-text'>{song.Title}</div>
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
                <div key={album.Album_id}>
                    <Link to={`/albums/${album.Album_id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={album.Cover_img}/>
                        </div>
                        <div className ='carousel-text'>{album.Album_Name}</div>
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
                <div key={artist.Artist_id}>
                    <Link to={`/artists/${artist.Artist_id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={artist.Cover_img}/>
                        </div>
                        <div className ='carousel-text'>{artist.Artist_Name}</div>
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
                <div key={playlist.Playlist_id}>
                    <Link to={`/playlists/${playlist.Playlist_id}`} className='carouselLink'>
                        <div className='carousel-image-container'>
                            <img className='carousel-image' src={playlist.Cover_img}/>
                        </div>
                        <div className ='carousel-text'>{playlist.Playlist_Name}</div>
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