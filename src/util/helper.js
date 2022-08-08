let printDate = function(){
    let date = new Date()
    console.log(date.getDate())
    printMonth()
}

let printMonth = function(){
    let month = new Date()
    console.log(month.getMonth()+1)
    getBatchInfo()
}

let getBatchInfo = function(){
    console.log('Plutonium, W3D5, the topic for today is Nodejs module system')
}

module.exports.currentDate = printDate
