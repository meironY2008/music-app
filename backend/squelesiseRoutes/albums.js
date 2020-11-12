const { Router } = require('express');
const { Album , Artist} = require('../models');

let router = Router();

router.route('/')
.get(async (req,res)=>{
   const allAlbum = await Album.findAll({include:[{
        model: Artist,
        attributes:['artistName']
        }]
    })
   return res.json(allAlbum);
})
.post(async(req,res)=>{
    try{ 
        const newAalbum = await Album.create(req.body);
        return res.status(201).json(newAalbum)
    }
    catch(err){
        return res.status(500).send({error: err.message})
    }
})

router.route('/:id')
.get(async (req,res)=>{
    try{
        const specAlbum = await Album.findByPk(req.params.id,{include:[{
            model: Artist,
            attributes:['artistName',"coverImg"]
            }]
        })
        const songsOfAlbum = await specAlbum.getSongs();
        return res.status(200).json( {album:specAlbum,songs:songsOfAlbum});
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
})
.put(async (req,res)=>{
    try{
        // let newValues = req.body;
        let [updated] = await Album.update(req.body,{ where: { id:req.params.id}})
        if(updated){
            const updateAlbum = await Album.findByPk(req.params.id);
            return res.status(200).json({updateAlbum});
        }
        throw new Error('no such album');
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
})
.delete(async(req,res)=>{
    try{
        const deleted = await Album.destroy({ where:{ id:req.params.id}});
        if(deleted){
            return res.status(204).send("deleted succsefully")
        }
        throw new Error('no such album');
    }
    catch(err){
        return res.status(500).send({error:err.message});
    }
}) 

module.exports = router;