module.exports = function WaiterRoutes(waiterRoutes) {
    function home(req, res, next) {
        res.render('index');

    }
    async function getWaiter(req, res, next) {
        // res.render("index")
        const user=req.params.username;
        const username = user.charAt(0).toUpperCase() + user.slice(1)
        // console.log(user);
        res.render('employee',
            {
                user: [{
                    'name': username
                }]
            }
        )


    }
    async function userCreate(req, res, next) {
    //    let username='';
    //    let weekday=[];
        //const
        
     const    username = req.params.username;
      //  const
    //   const username=user.charAt(0).toUpperCase() + user.slice(1)
     
    const     weekday = req.body.chkDays;
    // console.log(weekday)
        //  if (username===''){
        //      req.flash('inv','Enter a username.')
        //  }
        //  else 
         if (weekday===undefined&&username!==''){
             req.flash('inv','Please select days to work.')
         }
else if(username!==''&& weekday!==undefined){

    await waiterRoutes.countWaiters()
    
    await waiterRoutes.addUser(username, weekday);
req.flash('succ','Shifts successfully updated.')
}
else if (username==="" && weekday===undefined){
    req.flash('inv','Please enter your name and select days to work.')
}
console.log(username)
// else 
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