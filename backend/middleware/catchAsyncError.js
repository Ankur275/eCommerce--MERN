module.exports = theErr =>(req,res,next) =>{
    Promise.resolve(theErr(req,res,next)).catch(next)
}