let trim = function(){
    let x = "           Welcome to my Assignment           "
    console.log(x.trim())
    changetoLowerCase()
}

let changetoLowerCase = function(){
    let y = "MANTHAN KUMAR"
    console.log(y.toLowerCase())
    changetoUpperCase()
}

let changetoUpperCase = function(){
    let z = "manthan kumar"
    console.log(z.toUpperCase())
}

module.exports.case = trim
