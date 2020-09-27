import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './AlbumPage.css';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import lengthTime from '../function/lengthTime';

export default function AlbumPage() {
    
    const [albumInfo, setAlbumInfo] = useState([]);
    const [artistInfo, setArtistInfo] = useState('');
    const [songList, setSongList] = useState([]);
     
    const { id } = useParams();

    const showAlbumInfo = async () => {
        const { data } = await axios.get(`/albums/${id}`);
        setAlbumInfo(data.album);
        // const artist = await axios.get(`/artists/${data[0].Artist_id}`);
        setArtistInfo(
            <div>
                <Link to={`/artists/${data.album.artistId}`} className='albumPageLink'>
                    <div className='artist-image-container'>
                        <img src={data.album.Artist.coverImg} alt={data.album.Artist.artistName} className='artist-image' />
                    </div>
                    <div className='artist-name'>{data.album.Artist.artistName}</div>
                </Link>
            </div>
        );
        const songsArr = data.songs.map(song => {
              return (
                <div key={song.id}>
                    <Link to={`/songs/${song.id}?album=${song.albumId}`} className='albumPageLink'>
                        <div className='songTitleContainer'>
                            <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{song.title}</span></span>
                            <span style={{fontSize: "0.8em"}}>{lengthTime(song.length)}</span>
                        </div>
                    </Link>
                </div>
              );
          });
        setSongList(songsArr);
    }

    // const showSongs = async () => {
    //     const { data } = await axios.get('/songs');
    //     const songsArr = data.filter(song => song.Album_id == id)
    //       .map(item => {
    //           return (
    //             <div key={item.id}>
    //                 <Link to={`/songs/${item.id}?album=${item.Album_id}`} className='albumPageLink'>
    //                     <div className='songTitleContainer'>
    //                         <span className='artistSongTitle'><LibraryMusicSharpIcon /><span style={{marginLeft: "5px"}}>{item.Title}</span></span>
    //                         <span style={{fontSize: "0.8em"}}>{item.Length.substring(3)}</span>
    //                     </div>
    //                 </Link>
    //             </div>
    //           );
    //       });
    //     setSongList(songsArr);
    // }

    useEffect(() => {
        showAlbumInfo();
        // showSongs();
    }, []);

    return (
        <div>
            <h1 id='albumName'> {albumInfo.albumName} </h1>
            <div id='albumWrapper'>
                <div id='albumImageContainer'>
                    <img src={albumInfo.coverImg} alt={albumInfo.albumName} id='albumPageImage' />
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