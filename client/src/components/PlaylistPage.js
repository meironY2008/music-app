import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './PlaylistPage.css';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';

export default function PlaylistPage() {
    
    const [playlistInfo, setPlaylistInfo] = useState([]);
    const [songList, setSongList] = useState([]);

    const { id } = useParams();

    const showPlaylistInfo = async () => {
        const { data } = await axios.get('/playlists');
        // console.log(data);
        setPlaylistInfo(data.find(playlist => playlist.Playlist_id == id));
    }

    const showSongsList = async () => {
        const songs = await getSongs();
        // console.log(songs);
        const { data } = await axios.get(`/playlists/songs/${id}`);
        let songsArr = [];
        for (let i = 0; i < data.length; i++) {
            songsArr.push(songs.find(song => song.Song_id == data[i].Song_id));
        }
        songsArr = songsArr.map(song => {
            // console.log(song.Song_id);
            return (
                <div key={song.Song_id}>
                    <Link to={`/songs/${song.Song_id}?playlist=${id}`} className='playlistPageLink'>
                        <div className='songTitleContainer'>
                            <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{song.Title}</span></span>
                            <span style={{fontSize: "0.8em"}}>{song.Length.substring(3)}</span>
                        </div>
                    </Link>
                </div>
            )
        });
        setSongList(songsArr);
    }

    const getSongs = async () => {
        const { data } = await axios.get('/songs');
        return data;
    }

    useEffect(() => {
        showPlaylistInfo();
        showSongsList();
    }, []);
    
    return (
        <div>
            <h1 id='playlistName'>{playlistInfo.Playlist_Name}</h1>
            <div id='playlistWrapper'>
                <div id='playlistImageContainer'>
                    <img src={playlistInfo.Cover_img} alt={playlistInfo.Playlist_Name} id='playlistPageImage' />
                </div>
                <section id='playlist-song-section'>
                    <h3 id='songs-of-playlist'>Songs</h3>
                    <div id='playlist-song-container'>
                        {songList}
                    </div>
                </section>
            </div>
        </div>
    )
}