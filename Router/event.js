const express = require('express');
const router = express.Router();
const eventModel = require('../eventModel');
const mongoose = require('mongoose');
const { stringify } = require('querystring');


router.get('/events', async (req, res) => {
    const id = req.query.id;
    try { 
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message :'No post with that id' })
        const event = await eventModel.findById(id)
        console.log(event)
        res.status(200).json({event});
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: error.message})
    }
});


router.get('/events', async (req, res) => {
    const limit = parseInt(req.query.limit);
    const skip = parseInt(req.query.page);
    const type = (req.query.type);

    try { 
        const event = await eventModel.find({}).limit(limit).skip(skip).where({type : type})
        console.log(event)
        res.status(200).json({event});
    }
    catch (error){
        console.log(error);
        res.status(400).json({message: error.message})
    }
});



router.post('/events', async (req, res) => {
    const {name, files, tagline, schedule, description,
        moderator, category, sub_category, rigor_rank, type} = req.body;
        // console.log(req.body)
    try { 
        if(!name || !files || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank || !type) return res.status(400).json({message: "Please enter all the fields"});
        const event = await eventModel.create({
            name : name, 
            files : [files], 
            tagline : tagline, 
            schedule : schedule, 
            description : description,
            moderator : moderator, 
            category : category, 
            sub_category : sub_category,
            rigor_rank : rigor_rank,
            type : type
        });
        console.log(event)
        res.status(200).json({event, message : "Event created successfully"});


    } catch (error){
        console.log(error);
        res.status(400).json({message: error.message})
    }
});

router.delete('/events/:id', async (req, res) => {
    const {id : _id} = req.params
    console.log(req.params)
    try { 
        const event = await eventModel.findByIdAndDelete(_id)
        console.log(event)
        res.status(200).json({message : "Event deleted successfully"});


    } catch (error){
        console.log(error);
        res.status(400).json({message: error.message})
    }
});

router.put('/events/:id', async (req, res) => {
    const {id : _id} = req.params
    const {name, files, tagline, schedule, description,
        moderator, category, sub_category, rigor_rank} = req.body;
        // console.log(req.body)
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) {
            return res.status(404).json({message :'No post with that id' })
        }

        if(!name || !files || !tagline || !schedule || !description || !moderator || !category || !sub_category || !rigor_rank) {
            return res.status(400).json({message: "Please enter all the fields"});
        }

        const event = await eventModel.findByIdAndUpdate(_id,
            {
            name, 
            files : [files], 
            tagline, 
            schedule, 
            description,
            moderator, 
            category, 
            sub_category, 
            rigor_rank, 
            },
            {new : true})

        console.log(event)
        res.status(200).json({event, message : "Event updated successfully"});


    } catch (error){
        console.log(error);
        res.status(400).json({message: error.message})
    }
});


module.exports = router;