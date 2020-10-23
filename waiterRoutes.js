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
        // console.log(days)
        // console.log(id)
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

        var weekday =req.body.chkDays
     

    //   console.log(user);
    //   console.log(weekday)
        // const weekday = req.body.chkDays
        // var array = []
// var checkboxes = document.querySelectorAll('input[type=checkbox]:checked')

// for (var i = 0; i < weekday.length; i++) {
//   array.push(weekday[i])


        const days = await waiterRoutes.days();
        //why is this returning empty strings
       await waiterRoutes.addUser(user, weekday)
        res.render('employee',
            {
                days,
                //id,
                user

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