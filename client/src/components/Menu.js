import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import MenuIcon from '@material-ui/icons/Menu';
import AlbumIcon from '@material-ui/icons/Album';
import LibraryMusicSharpIcon from '@material-ui/icons/LibraryMusicSharp';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink, Link } from 'react-router-dom';
import logo from './logo-name.png';

export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='header'>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        <MenuIcon />
      </Button>
      <Link to="/"><img src={logo} id="logo" alt="logo"/></Link>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}><NavLink to="/songs" className="menuOption"><LibraryMusicSharpIcon /><span>Songs</span></NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink to="/playlists" className="menuOption"><PlaylistPlayIcon /><span>Playlists</span></NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink to="/albums" className="menuOption"><AlbumIcon /><span>Albums</span></NavLink></MenuItem>
        <MenuItem onClick={handleClose}><NavLink to="/artists" className="menuOption"><QueueMusicIcon /><span>Artists</span></NavLink></MenuItem>  
        <MenuItem onClick={handleClose}><NavLink to="/search" className="menuOption"><SearchIcon /><span>Search</span></NavLink></MenuItem>  
      </Menu>
    </div>
  );
}