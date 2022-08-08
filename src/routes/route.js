const express = require('express');
const abc = require('../introduction/intro')
const lodash = require('lodash')
const router = express.Router();

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    let a = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Aug','Sept','Oct','Nov','Dec']
    let b = lodash.chunk(a,4)
    console.log(b)
    let odd = [1,3,5,7,9,11,13,15,17,19]
    let tail = lodash.tail(odd)
    console.log(tail)
    let m = [1,2,3]
    let n = [3,4,5]
    let o = [5,6,7]
    let p = [7,8,9]
    let r = [8,9,1]
    let union = lodash.union(m,n,o,p,r)
    console.log(union)
    let arr = [['horror','The Shining'],['drama','Titanic'],['thriller','Shutter Island'],['fantasy','Pans Labyrinth']]
    let pairs = lodash.fromPairs(arr)
    console.log(pairs)
    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason
