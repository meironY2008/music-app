import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Carousel from 'react-elastic-carousel';
import { Link } from 'react-router-dom';

export default function Home() {

    const [topSongs, setTopSongs] = useState([]);
    const [topAlbums, setTopAlbums] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [topPlaylists, setTopPlaylists] = useState([]);

    const showTopSongs = async () => {
        const { data } = await axios.get('/top/songs');
        const songsArr = data.map(song => <div className='noImage'><Link to={`/songs/${song.Song_id}`}>{song.Title}</Link></div>
        );
        setTopSongs(songsArr);
    }

    const showTopAlbums = async () => {
        const { data } = await axios.get('/top/albums');
        const albumsArr = data.map(album => {
            return (
                <Link to={`/albums/${album.Album_id}`} className='imageContainer'>
                <img className='image' src={album.Cover_img}/>
                    <div className ='imageText'>{album.Album_Name}</div>
                </Link>
            );
        });
        setTopAlbums(albumsArr);
    }

    const showTopArtists = async () => {
        const { data } = await axios.get('/top/artists');
        const artistsArr = data.map(artist => <div className='noImage'><Link to={`/artists/${artist.Artist_id}`}>{artist.Artist_Name}</Link></div>
        );
        setTopArtists(artistsArr);
    }

    const showTopPlaylists = async () => {
        const { data } = await axios.get('/top/playlists');
        const playlistsArr = data.map(playlist => <div className='noImage'><Link to={`/playlists/${playlist.Playlist_id}`}>{playlist.Playlist_Name}</Link></div>
        );
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