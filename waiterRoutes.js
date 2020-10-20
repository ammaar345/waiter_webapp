module.exports=function WaiterRoutes(pool) {
function home(req,res,next){
    res.render('index');

}
    function userName(req, res, next) {
        // res.render("index")
const username=req.params.waiterName;
res.render('employee',
// {user
    
// }
    )


    }

    function userCreate(req,res,next) {


    }

    return {
        userName,
         userCreate,
         home

    }
}