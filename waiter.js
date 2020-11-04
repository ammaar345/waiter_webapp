module.exports = function WaiterFunc(pool) {
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
        return waiterNames.rows//no structure to really show which day he /she is working
    }

    function dayColor(waiterCount) {
        if (waiterCount = 3) {
            return "green"
        }
        if (waiterCount > 3) {
            return "orange"
        }
        else if (waiterCount < 3) {
            return "red"

        }

    }
    async function dayNameList() {
        const dayObjs = await pool.query('select * from weekdays');
        const days = dayObjs.rows;
        for (let i = 0; i < days.length; i++) {
            const day = days[i];
            const waiters = await waitersWorking(day.id)

            day.waiters = waiters;

        }
        return dayObjs.rows
    }
    return {
        dayColor,
        clearDataBase,
        addUser,
        dayNameList,
        waitersWorking,
        daysNames
    }

}