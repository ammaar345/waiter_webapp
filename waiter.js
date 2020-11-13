module.exports = function WaiterFunc(pool) {
    let waiterCount
    async function addUser(user, week) {
        const SELECT_QUERY = 'SELECT id FROM waiters where name=($1)';

        let waiter = await pool.query(SELECT_QUERY, [user])
        const INSERT_QUERY = 'INSERT into waiters (name)values ($1) '
        const DELETE_QUERY = 'delete from tblshift where waiternameid=$1'
        if (waiter.rows.length === 0) {


            await pool.query(INSERT_QUERY, [user])
            waiter = await pool.query('select id from waiters where name=($1)', [user]);
        }
        await pool.query(DELETE_QUERY, [waiter.rows[0].id])
        for (const day of week) {
            // console.log(day);
            const INSERT_QUERY2 = 'insert into tblshift (weekdayid,waiternameid) values ($1,$2)'
            const weekdayID = await pool.query('SELECT id from weekdays where dayname=($1)', [day]);
            await pool.query(INSERT_QUERY2, [weekdayID.rows[0].id, waiter.rows[0].id])
        }

    }
    async function daysNames() {
        const dayNames = await pool.query('SELECT waiternameid,weekdayid from tblshift')
        return dayNames.rows
    }
    async function clearDataBase() {
        const clearDb = 'DELETE FROM tblshift';
        const DELETE_QUERY = 'DELETE FROM waiters ';
        await pool.query(clearDb);
        await pool.query(DELETE_QUERY);

    }
    async function waitersWorking(day) {
        const waiterNames = await pool.query(`SELECT  waiters.name AS name
    FROM waiters
    LEFT JOIN tblshift
    ON waiters.id=tblshift.waiternameid
    LEFT JOIN weekdays
    ON weekdays.id=tblshift.weekdayid
    where weekdays.id=$1` , [day])
        return waiterNames.rows;
    }
    // SELECT  weekdays.dayname AS Weekday
    // FROM weekdays
    // LEFT JOIN tblshift
    // ON weekdays.id= tblshift.weekdayid 
    // left join waiters
    // on waiters.id=tblshift.waiternameid
    // where waiters.name='Ammaar'

    //     async function daysWorking(name) {
    //         const daysWorking = await pool.query(`  SELECT  weekdays.dayname AS Weekday
    // FROM weekdays
    // LEFT JOIN tblshift
    // ON weekdays.id= tblshift.weekdayid 
    // left join waiters
    // on waiters.id=tblshift.waiternameid
    // where waiters.name=$1

    // `, [name]);
    //         return daysWorking.rows;
    //     }
    // async function dayColor(waiterNum) {
    //     const day = await pool.query('select dayname from weekdays');
    //     var color = "";
    //     const days = day.rows;
    //     for (let i = 0; i < days.length; i++) {
    //         if (waiterNum < 3) {
    //             color = "red"
    //             // console.log(days)
    //         }
    //         else
    //             if (waiterNum > 3) {
    //                 color = "orange"
    //             }
    //         if (waiterNum == 3) {
    //             color = "green"
    //         }

    //     }
    //     // console.log(color)
    //     return color

    // }
    async function dayNameList() {
        const dayObjs = await pool.query('select * from weekdays');
        const days = dayObjs.rows;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const waiters = await waitersWorking(day.id)
            // dayColor(waiters)
            day.waiters = waiters
        }
        return days
    }
    async function countWaiters() {
        const dayObjs = await pool.query('select * from weekdays');
        const days = dayObjs.rows;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const waiters = await waitersWorking(day.id)
            day.waiters = waiters;
            day.count = waiters.length;
            // var waiterCount
            // var waiterCount = day.waiters.length
            // console.log(waiterCount)
            if (day.count < 3) {
                day.color = 'red'
            }
         else   if (day.count > 3) {
                day.color = 'orange'
            }
          else  if (day.count == 3) {
                day.color = 'green'
            }


        }
        // console.log(days)
        return days
        // console.log({days})
        // console.log(waiterCount)    
        // return day.waiters.length
    }


    // return waiterCount

    async function getAllDays() {
        const daysOfWeek = await pool.query('SELECT dayname FROM Weekdays')
        return daysOfWeek.rows;
    }
    // function waiterCountFunc() {

    //     return waiterCount
    // }

    async function checkedDays(waiter) {
        var waiterSelected = await pool.query('Select name from waiters where name=$1', [waiter])
        const allWaiters = await pool.query('Select name from waiters');
        var waitersWorkingDays = await pool.query(`  SELECT  weekdays.dayname AS Weekday
        FROM weekdays
        LEFT JOIN tblshift
        ON weekdays.id= tblshift.weekdayid 
        left join waiters
        on waiters.id=tblshift.waiternameid
        where waiters.name=$1
        
        `, [waiter]);
        const waiterName = waiterSelected.rows;
        const allWaiterNames = allWaiters.rows;
        const allDays = await getAllDays()
        // var waitersWorkingDays = await daysWorking(waiter);

        const days = waitersWorkingDays.rows;
        // console.log(waiterName)
        if (days.rowCount === 0) {
            return allDays;
        }


        else {

            for (day of allDays) {
                waitersWorkingDays
                for (waiterSelected of days) {

                    if (waiterSelected.weekday == day.dayname) {
                        day.checked = "checked";
                    }


                }
            }
            // console.log({ allDays })
            // console.log(days)
            return allDays;
        }
        // return waitersWorkingDays
    }
    return {
        // dayColor,
        clearDataBase,
        addUser,
        dayNameList,
        waitersWorking,
        daysNames,
        countWaiters,
        // waiterCountFunc,
        getAllDays,
        // daysWorking,
        checkedDays
        // waiterCounting
    }

}