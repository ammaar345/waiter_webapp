module.exports = function WaiterFunc(pool) {

    async function addUser(user,weekday) {
        const SELECT_QUERY='SELECT FROM waiters where name=$1';
        const waiter=await pool.query(SELECT_QUERY,[user]).rows.length
        const INSERT_QUERY = "INSERT into waiters values ($1,$2) "
        const UPDATE_QUERY="UPDATE tblshift set weekdayid=$2 where waiternameid=$3" //$3 = id parameter
if (waiter>0){
await pool.query(UPDATE_QUERY,[weekday])
}
else{
    await pool.query(INSERT_QUERY,[user,weekday])
}


    }

    async function clearDataBase() {
        const DELETE_QUERY = 'DELETE FROM waiters '
const clearDb='DELETE FROM tblshift'
await pool.query(DELETE_QUERY)
await pool.query(clearDb)
    }
    async function days() {
        const selectQ = 'SELECT dayofweek from weekdays';
        const days = await pool.query(selectQ);
        console.log(days.rows)
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