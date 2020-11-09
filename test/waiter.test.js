const assert = require("assert");
const Waiter = require("../waiter");

const pg = require("pg");
const Pool = pg.Pool;
const connectionString = process.env.DATABASE_URL || 'postgresql://sneakygoblin:codex123@localhost:5432/waiters';
const pool = new Pool({
  connectionString
});
beforeEach(async function () {
  await pool.query('drop table if EXISTS tblshift,waiters');
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
    await waiter.addUser('Joe', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
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
  it("tests if the database clears two datasets.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.addUser('Joe', ['Tuesday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.clearDataBase();
    assert.deepEqual(await waiter.daysNames(), [])
  })
  it("tests if the database clears three datasets.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.addUser('Joe', ['Tuesday', 'Monday', 'Friday']);
    await waiter.addUser('Henry', ['Monday', 'Friday']);
    await waiter.clearDataBase();
    assert.deepEqual(await waiter.daysNames(), [])
  })
  it("tests if the database clears one dataset.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Jenna', ['Friday', 'Monday', 'Tuesday', 'Wednesday']);
    await waiter.clearDataBase();
    assert.deepEqual(await waiter.daysNames(), []);
  })



  it("returns orange if the number of waiters is more than 3.", async function () {
    let waiter = Waiter(pool);
    let waiterCount = 4

    assert.equal(await waiter.dayColor(waiterCount
    ), 'orange');
  })

  it("returns green if the number of waiters is equal to 3.", async function () {
    let waiter = Waiter(pool);
    let waiterCount = 3
    assert.equal(await waiter.dayColor(waiterCount), 'green');
  })

  it("returns red if the number of waiters is less than 3.",async function () {
    let waiter = Waiter(pool);
    let waiterCount = 2
    assert.equal(await waiter.dayColor(waiterCount), 'red');
  
  })
  it("should count 6 workers for monday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Monday']);
    await waiter.addUser('Joe', ['Monday',]);
    await waiter.addUser('Thomas', ['Monday',]);
    await waiter.addUser('Jen', ['Monday',]);
    await waiter.addUser('Low', ['Monday',]);
    await waiter.addUser('Lee', ['Monday',]);
    const waiterCount = await waiter.waitersWorking(1)
    assert.equal(await waiterCount.length, 6)

  })
  it("should count 2 workers for Tuesday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Ammaar', ['Tuesday']);
    await waiter.addUser('Joe', ['Tuesday']);
    const waiterCount = await waiter.waitersWorking(2)
    assert.equal(await waiterCount.length, 2)

  })
  it("should count 3 workers for Wednesday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Jody', ['Wednesday']);
    await waiter.addUser('Ester', ['Wednesday']);
    const waiterCount = await waiter.waitersWorking(3)
    assert.equal(await waiterCount.length, 2)

  })
  it("should count 1 worker for Friday.", async function () {
    let waiter = Waiter(pool);
    await waiter.addUser('Timothy', ['Friday']);
    const waiterCount = await waiter.waitersWorking(5)
    assert.equal(await waiterCount.length, 1)

  })


})



