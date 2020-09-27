import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import './ArtistPage.css';
import lengthTime from '../function/lengthTime';


export default function ArtistPage({match}) {

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistSongs, setArtistSongs] = useState([]);

    const showArtistInfo = async () => {
        const { data } = await axios.get(`/artists/${match.params.id}`);
        console.log('data:',data);
        setArtistName(data.artist.artistName);
        setArtistImage(data.artist.coverImg);
        const albumsArr = data.albums.map(album => {
                return (
                    <div key={album.id}>
                        <Link to={`/albums/${album.id}`} className='artistPageLink'>
                            <div className='albumImagePageContainer'>
                                <img src={album.coverImg} alt={album.albumName} className='albumPageImage' />
                            </div>
                            <div className='albumPageName'>{album.albumName}</div>
                        </Link>
                    </div>
                )
            });
        setArtistAlbums(albumsArr);
        const songsArr = data.songs.map(song => {
                return (
                    <div key={song.id}>
                        <Link to={`/songs/${song.id}?artist=${song.artistId}`} className='artistPageLink'>
                            <div className='songTitleContainer'>
                                <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{song.Title}</span></span>
                                <span style={{fontSize: "0.8em"}}>{lengthTime(song.length)}</span>
                            </div>
                        </Link>
                    </div>  
                )
          });
        setArtistSongs(songsArr);
    }

   

    useEffect(() => {
        showArtistInfo();
    }, []);

    return (
        <div>
            <h1 id='artistName'> {artistName} </h1>
            <div id='wrapper'>
                <div id='artistImageContainer'>
                    <img src={artistImage} alt={artistName} id='artistPageImage' />
                </div>
                <section id='albumSection'>
                    <h3 id='artistAlbums'>Albums</h3>
                    <div id='albumsContainer'>
                        {artistAlbums}
                    </div>
                </section>
                <section id='songSection'>
                    <h3 id='artistSongs'>Songs</h3>
                    <div id='songsContainer'>
                       {artistSongs}
                    </div>
                </section>
            </div>
        </div>
    )
}