import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import './ArtistPage.css';

export default function ArtistPage({match}) {

    const [artistName, setArtistName] = useState('');
    const [artistImage, setArtistImage] = useState('');
    const [artistAlbums, setArtistAlbums] = useState([]);
    const [artistSongs, setArtistSongs] = useState([]);

    const showArtistInfo = async () => {
        const { data } = await axios.get(`/artists/${match.params.id}`);
        setArtistName(data[0].Artist_Name);
        setArtistImage(data[0].Cover_img);
    }

    const showAlbums = async () => {
        const { data } = await axios.get('/albums');
        const albumsArr = data.filter(album => album.Artist_id == match.params.id)
            .map(item => {
                return (
                    <div key={item.Album_id}>
                        <Link to={`/albums/${item.Album_id}`} className='artistPageLink'>
                            <div className='albumImagePageContainer'>
                                <img src={item.Cover_img} alt={item.Album_Name} className='albumPageImage' />
                            </div>
                            <div className='albumPageName'>{item.Album_Name}</div>
                        </Link>
                    </div>
                )
            });
        setArtistAlbums(albumsArr);
    }

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data.filter(song => song.Artist_id == match.params.id)
            .map(item => {
                return (
                    <div key={item.Song_id}>
                        <Link to={`/songs/${item.Song_id}?artist=${item.Artist_id}`} className='artistPageLink'>
                            <div className='songTitleContainer'>
                                <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{item.Title}</span></span>
                                <span style={{fontSize: "0.8em"}}>{item.Length.substring(3)}</span>
                            </div>
                        </Link>
                    </div>  
                )
          });
        setArtistSongs(songsArr);
    }

    useEffect(() => {
        showArtistInfo();
        showAlbums();
        showSongs();
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