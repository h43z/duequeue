## duequeue.js
Executes jobs at a specific time in future. Only uses one single timer per queue.


```
$ npm install duequeue
```

```js
const duequeue = require('duequeue')

let myQueue = duequeue.create(async(payload, task) => {
  // do some task here
  const delta = Date.now() - task.due
  console.log(`delta: ${delta} payload: ${payload}`)

  // mark job as done in database
  // eg: payload has rowid to db entry
})

// it's up to you how and if you want to persit your jobs
// you can import undone jobs into duequeue
let jobs = database.getDueJobs()
jobs.forEach(job => q.add(job.due, job.rowid))


let newJob = {...}

// if you decide to persit jobs somehow
let rowid = database.store(newJob)

q.add(new Date(2020,1,1), rowid) // will trigger 2020-01-01

q.add(new Date(1991,1,1), "it's 1991!") // will trigger instantly
q.add(Date.now() + 10000, "after 10s")  // will trigger now + 10s 
q.add(Date.now() , "instant")           // will trigger instantly
```
