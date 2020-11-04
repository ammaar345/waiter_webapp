const assert = require("assert");
const Waiter = require("../waiter");

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/waiters';
const pool = new Pool({
  connectionString
});
beforeEach(async function () {
  await pool.query('drop table if EXISTS tblshift,waiters;');
  await pool.query(`create table waiters
     (id serial not null primary key,
         name text not null
      )`)


  await pool.query(`create table tblshift
    (
        id serial not null primary key,
        waiternameid int not null,
        weekdayid int not null,
        FOREIGN key (waiternameid) REFERENCES waiters(id),
        FOREIGN key (weekdayid) REFERENCES weekdays(id)
    )`)
})
describe("Should test the functions in Waiters that are returning values", function () {
  it("Should add the day ID of Monday , Tuesday and Wednesday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Monday', 'Tuesday', 'Wednesday']);
    assert.deepEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 1
      },
      {
        waiternameid: 1,
        weekdayid: 2
      },
      {
        waiternameid: 1,
        weekdayid: 3
      }
    ])

  })
  it("Should add the day ID of Wednesday , Thursday and Friday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Thomas', ['Wednesday', 'Thursday', 'Friday',]);
    assert.deepEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 3
      },
      {
        waiternameid: 1,
        weekdayid: 4
      },
      {
        waiternameid: 1,
        weekdayid: 5
      }
    ]

    )

  })
  it("Should add the day ID of Friday , Monday and Tuesday as well as the waiter ID into the database.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Joe', ['Friday', 'Monday', 'Tuesday','Wednesday']);
    assert.deepEqual(await waiter.daysNames(), [
      {
        waiternameid: 1,
        weekdayid: 5
      },
      {
        waiternameid: 1,
        weekdayid: 1
      },
      {
        waiternameid: 1,
        weekdayid: 2
      },
      {
        waiternameid: 1,
        weekdayid: 3
      }
    ])

  })
  // describe("Should test that the registrations are being inserted into the database.", async function () {
  //     it("Should show  3 registrations in the database.", async function () {
  //     })
  // it("Should return  2 registrations in the database.", async function () {
  //       })
  // it("Should show  3 registrations in the database , since one registration is a duplicate.", async function () {

  // })

})



