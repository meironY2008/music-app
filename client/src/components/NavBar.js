import React from 'react';
import {NavLink} from 'react-router-dom';

export default function NavBar() {
    return (
        <div id='menu'>
           <NavLink to='/songs' className='menuOption'>Songs</NavLink> 
           <NavLink to='/playlists' className='menuOption'>Playlists</NavLink> 
           <NavLink to='/artists' className='menuOption'>Artists</NavLink> 
           <NavLink to='/albums' className='menuOption'>Albums</NavLink> 
        </div>
    )
}
