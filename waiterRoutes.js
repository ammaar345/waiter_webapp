// const waiter = require("./waiter");

module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const username = req.params.waiterName
        const days = await waiterRoutes.days();
        const id = await waiterRoutes.id()
        console.log(days)
        console.log(id)
        res.render('employee',
            {
                days,
                //id,
                username

            }
        )


    }
   async function userCreate(req, res, next) {
        const user = req.body.waiterName;
        // const weekday = req.body.chkDays
        const weekday =Array.isArray(req.body.chkDays)?req.body.chkDays:[req.body.chkDays ]
        const days = await waiterRoutes.days();
       await waiterRoutes.addUser(user, weekday)
        res.render('employee',
            {
                days,
                //id,
                username

            }
        )


    }


    async function admin(req, res, next) {

        res.render("schedule",
            {

            })


    }


    return {
        getWaiter,
        userCreate,
        home,
        admin

    }
}