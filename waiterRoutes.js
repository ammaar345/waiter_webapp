module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const user = req.params.username;
        // console.log(user);
        res.render('employee',
            {
                user: [{
                    'name': user
                }]
            }
        )


    }
    async function userCreate(req, res, next) {
       let username='';
       let weekday=[];
        //const
         username = req.params.username;
      //  const
         weekday = req.body.chkDays;
if (weekday===[]){
req.flash('inv','Tollie')
}
else if(username!==''&& weekday!==[]){

    await waiterRoutes.countWaiters()
    
    await waiterRoutes.addUser(username, weekday);
req.flash('succ','Bread')
}
// else if (username==="" && weekday===[]){
//     req.flash('inv','Penis')
// }
// else if (username===''){}
// req.flash('inv','PP')

        res.render('employee',
            {
                user: [{
                    'name': username
                }]


            }

        )
    }


    async function admin(req, res, next) {
        const days = await waiterRoutes.dayNameList();
        await waiterRoutes.countWaiters()
        //   console.log(waiterCount)
        const waiterCount = waiterRoutes.waiterCountFunc()
        const count = await waiterRoutes.dayColor(waiterCount);
        // console.log(await waiterRoutes.waiterCounting())
        res.render('schedule',
            {
                days,
                counter: [{
                    'color':
                        count
                }]
            }
        )


    }
    async function waiterHome(req, res) {
        res.render('employee', {

        })
    }

    return {
        getWaiter,
        userCreate,
        home,
        admin,
        waiterHome

    }
}