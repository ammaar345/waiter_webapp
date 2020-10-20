// const waiter = require("./waiter");

module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
  async  function userName(req, res, next) {
        // res.render("index")
        const username = req.params.waiterName
        const days=await waiterRoutes.days();
        const id=await waiterRoutes.id
        console.log(days)
        console.log(id)
        res.render('employee',
            {days,id,
                username

            }
        )


    }
    async function admin(req, res, next) {

        res.render("schedule",
            {

            })


    }

    function userCreate(req, res, next) {


    }

    return {
        userName,
        userCreate,
        home,
        admin

    }
}