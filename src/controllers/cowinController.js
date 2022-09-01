let axios = require("axios")

// Question 1

try {
    let district = async function (req, res){
        let id = req.query["district_id"]
        let date = req.query.date
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${date}`
        }
        let solution = await axios(options)
        res.status(200).send({data: solution.data})
    }
} catch (error) {
    res.status(500).send({msg: error.message})
}

// Question 2
    // Part 1 & 2 

    try {
        let temp = async function (req, res){
            let place = req.query.q
            let id = req.query.appid
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${id}`
            }
            let solution = await axios(options)
            let result = solution.data
            res.status(200).send({data: result})
        }
    } catch (error) {
        res.status(500).send({msg: error.message})
    }


// Part 3

try {
    let allCities = async function(req, res){
        let id = req.query.appid
        let cities = [ "Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
        let arr = []
    
        for (index = 0; index<cities.length; index++){
            let temp = {city: cities[index]}
    
            let options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${cities[index]}&appid=${id}`
            }
            let solution = await axios(options)
            temp.temp = solution.data.main.temp
            arr.push(temp)
        }
    
        let arrange = arr.sort(function(a,b){return a.temp - b.temp})
    
        res.status(200).send({data: arrange})
    }
} catch (error) {
    res.status(500).send({msg: error.message})
}


// Question 3

try {
    let meme = async function(req, res){
        let id = req.query["template_id"]
        let msg = req.query.text0
        let name = req.query.username
        let password = req.query.password
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id=${id}&text0=${msg}&username=${name}&password=${password}`
        }
        let solution = await axios(options)
        let result = solution.data
        res.status(200).send({data:result})
    }
} catch (error) {
    res.status(500).send({msg: error.message})
}


module.exports.district = district
module.exports.temp = temp
module.exports.allCities = allCities
module.exports.meme = meme
