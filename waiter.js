module.exports =  function WaiterFunc(pool) {

    async function addUser(user, week) {
        const SELECT_QUERY = 'SELECT id FROM waiters where name=$1';
        const waiter = await pool.query(SELECT_QUERY, [user])
        const INSERT_QUERY = "INSERT into waiters (name)values ($1) "
        // const UPDATE_QUERY="UPDATE tblshift set weekdayid=$2 where waiternameid=$3" //$3 = id parameter
        const DELETE_QUERY = "delete from tblshift where waiternameid=$1"
        if (waiter.rows.length === 0) {
            await pool.query(INSERT_QUERY, [user])
        }
        await pool.query(DELETE_QUERY, [waiter.rows[0].id])
        for (const key of week) {
            const INSERT_QUERY2 = 'insert into tblshifts (waiternameid,weekdayid) values ($1,$2)'
            const SELECT_QUERY2 = "SELECT id from weekdays where dayofweek=$1"
            var weekdayID = await pool.query(SELECT_QUERY2, [key]);
            await pool.query(INSERT_QUERY2, [waiter.rows[0].id], weekdayID.rows[0].id)
        }
console.log(bread)
    }

    async function clearDataBase() {
        const DELETE_QUERY = 'DELETE FROM waiters '
        const clearDb = 'DELETE FROM tblshift'
        await pool.query(DELETE_QUERY)
        await pool.query(clearDb)
    }
    async function days() {
        const selectQ = 'SELECT dayofweek from weekdays';
        const days = await pool.query(selectQ);
        return days.rows
    }
    async function id() {
        const selectQuery = 'SELECT id from weekdays'
        const id = await pool.query(selectQuery);
        return id.rows
    }
    return {
        clearDataBase,
        addUser,
        days,
        id

    }

}