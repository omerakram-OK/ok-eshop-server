const {Category} = require('../models/category');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(500).json({success: false})
    } 
    res.send(categoryList);
})

router.get('/:id', async (req,res) => {
    const category = await Category.findById(req.params.id);

    if(!category){
        return res.status(401).json({
            success:false,
            message:'no category was found'
        })
    }
    res.status(200).send(category);
})

router.put('/:id', async (req,res) => {
    const category = await Category.findByIdAndUpdate(
        req.params.id,
        {
            name : req.body.name,
            icon : req.body.icon,
            color : req.body.color
        },
        {
            new : true
        }
    )
    if(!category){
        return res.status(401).send('categry not found')
    }
    res.status(401).send(category);
})


router.post('/',async (req,res) => {
    const category = new Category ({
        name : req.body.name,
        color : req.body.color,
        icon : req.body.icon,
        image : req.body.image
    })

    // category = await category.save();

    // if(!category)
    // return res.status(400).send("category cannot be created")

    // res.send(category);

    // const stat = !category ? res.send('cat not found') : res.send(category);

    // res.send(stat);


    category.save().then(categoryAdded => {
        res.status(401).json(categoryAdded)
    }).catch((err) => {
        res.status(501).json({
            error: err,
            success: false
        })
    })
})


router.delete('/:id',(req,res) =>{
    Category.findByIdAndRemove(req.params.id).then(category => {
        if(category){
            return res.status(401).json({
                success:true,
                message : 'category deleted succesfullt'
            })
        }
        else {
            return res.status.json({
                success : false,
                message : 'categoryy not found'
            })
        }
    }).catch((err) =>{
        res.status(501).json({
            error: err,
            success: false
        })
    })
})
// router.delete('/:id', (req, res) => {
//     Category.findByIdAndRemove(req.params.id).then((category => {
//         if(category) {
//         return res.status(201).json({
//             success: true,
//             message : "the category deleted succesfully"
//         })
//     }
//         else{
//         return res.status(401).json({
//             success: false,
//             message : "category cannot found"
//         })
//     }
//     })
//     .catch((err) =>{
//         res.status(500).json({
//             error: err,
//             success: false
//         })
//     })
//     )
// })

module.exports =router;