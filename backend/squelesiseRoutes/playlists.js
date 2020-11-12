const { Router } = require('express');
const { Playlist,Album, Artist, Song, Library } = require('../models');

let router = Router();

router.route('/')
.get(async (req,res)=>{
   const allPlaylist =  await Playlist.findAll()
   return res.json(allPlaylist);
})
.post(async(req,res)=>{
    try{ 
        const newPlaylist = await Playlist.create(req.body);
        return res.status(201).json({newPlaylist})
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
})

router.route('/:id')
.get(async (req,res)=>{
    try{
        const specPlaylist = await Playlist.findByPk(req.params.id);
        const songsInPlaylist = await Song.findAll({
            include: [
              {
                model: Library,
                attributes: [],
                where: {
                  playlistId: req.params.id 
                },
              },
              {
                model: Artist,
                attributes: ["artistName"],
                required: true,
              },
              {
                model: Album,
                attributes: ["albumName"],
                required: true,
              },
            ]
          });
        return res.status(200).json({playlist: specPlaylist, songs: songsInPlaylist});
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
})
.put(async (req,res)=>{
    try{
        // let newValues = req.body;
        let [updated] = await Playlist.update(req.body,{ where: { id:req.params.id}})
        if(updated){
            const updatePlaylist = await Playlist.findByPk(req.params.id);
            return res.status(200).json(updatePlaylist);
        }
        throw new Error('no such Playlist');
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
})
.delete(async(req,res)=>{
    try{
        const deleted = await Playlist.destroy({ where:{ id:req.params.id}});
        if(deleted){
            return res.status(204).send("deleted succsefully")
        }
        throw new Error('no such Playlist');
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
})

module.exports = router;