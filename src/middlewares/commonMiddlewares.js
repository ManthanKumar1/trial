
const mid1= function (req, res, next) {
    console.log("Hi I am a middleware named Mid1")
    let timestamp = new Date()
    console.log(timestamp)
    console.log(req.socket.localAddress)
    console.log(req.path)
    next()
}


module.exports.mid1= mid1
