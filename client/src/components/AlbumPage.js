import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './AlbumPage.css';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';

export default function AlbumPage() {
    
    const [albumInfo, setAlbumInfo] = useState([]);
    const [artistInfo, setArtistInfo] = useState('');
    const [songList, setSongList] = useState([]);
     
    const { id } = useParams();

    const showAlbumInfo = async () => {
        const { data } = await axios.get(`/albums/${id}`);
        setAlbumInfo(...data);
        const artist = await axios.get(`/artists/${data[0].Artist_id}`);
        setArtistInfo(
            <div>
                <Link to={`/artists/${artist.data[0].Artist_id}`} className='albumPageLink'>
                    <div className='artist-image-container'>
                        <img src={artist.data[0].Cover_img} alt={artist.data[0].Artist_Name} className='artist-image' />
                    </div>
                    <div className='artist-name'>{artist.data[0].Artist_Name}</div>
                </Link>
            </div>
        );
    }

    const showSongs = async () => {
        const { data } = await axios.get('/songs');
        const songsArr = data.filter(song => song.Album_id == id)
          .map(item => {
              return (
                <div key={item.Song_id}>
                    <Link to={`/songs/${item.Song_id}?album=${item.Album_id}`} className='albumPageLink'>
                        <div className='songTitleContainer'>
                            <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{item.Title}</span></span>
                            <span style={{fontSize: "0.8em"}}>{item.Length.substring(3)}</span>
                        </div>
                    </Link>
                </div>
              );
          });
        setSongList(songsArr);
    }

    useEffect(() => {
        showAlbumInfo();
        showSongs();
    }, []);

    return (
        <div>
            <h1 id='albumName'> {albumInfo.Album_Name} </h1>
            <div id='albumWrapper'>
                <div id='albumImageContainer'>
                    <img src={albumInfo.Cover_img} alt={albumInfo.Album_Name} id='albumPageImage' />
                </div>
                <section id='artistSection'>
                    <h3 id='artist-of-album'>Artist</h3>
                    <div id='artist-container'>
                        {artistInfo}
                    </div>
                </section>
                <section id='album-song-section'>
                    <h3 id='songs-of-album'>Songs</h3>
                    <div id='album-song-container'>
                        {songList}
                    </div>
                </section>
            </div>
        </div>
    )
}