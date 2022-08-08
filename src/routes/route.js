const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    res.send('My second ever api!')
});

router.get('/movies', function(req,res){
    let movie = ["KGF", "Don", "GoodNewz","End Game"]
    console.log(movie)
    res.send("movieName")
})

router.get('/movies/:indexNumber', function(req,res){
    let name = ['Rang de basanti', 'The shining', 'Lord of the rings', 'Batman begins']
    let i = req.params.indexNumber
    if (i>=name.length || i<0){
        res.send("movie not found")
    }else{
    res.send(name[i])
}})

router.get('/movie/:Number', function(req,res){
    let movie = ['DDLJ','YJHD','SOTY','BB']
    let index = req.params.Number
    if (index>=movie.length){
        res.send("movie length is greater")
    }else{
        res.send(movie[index])
    }
})

router.get('/films', function(req,res){
    let m = [ {
        'id': 1,
        'name': 'The Shining'
       }, {
        'id': 2,
        'name': 'Incendies'
       }, {
        'id': 3,
        'name': 'Rang de Basanti'
       }, {
        'id': 4,
        'name': 'Finding Nemo'
       }]
       console.log(m)
    res.send("films")       
})

router.get('/films/:filmId', function(req,res){
    let o = [ {
        'id': 1,
        'name': 'Superman'
       }, {
        'id': 2,
        'name': 'Batman'
       }, {
        'id': 3,
        'name': 'Spiderman'
       }, {
        'id': 4,
        'name': 'IronMan'
       }]
       let j = req.params.filmId
       if (j>=o.length || j<0){
        res.send("film not found")
       }else{
       res.send(o[j])
    }
})

router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
