function create(callback){
  const tasks = []
  let timer = null
  let runningIndex = -1

  function add(due, payload){
    const task = {
      due,
      payload
    }

    const index = tasks.push(task) -1

    // if no timer is running start it
    if(runningIndex == -1)
      return start(task, index)

    // current running task will finish earlier than new task return
    if(tasks[runningIndex].due < task.due)
      return

    // replace current timer with new task timer it will finish first
    clearTimeout(timer)
    return start(task, index)
  }

  function getNextTaskId(){
    // find next task that will finish first
    return tasks.reduce((iMin, task, index, tasks) => {
      return task.due < tasks[iMin].due ? index : iMin
    }, 0)
  }

  function start(task, index){
    // save running index
    runningIndex = index

    // maximum ms value for setTimeout
    const TIMEOUT_MAX = 2147483647

    let delta = task.due - Date.now()
    let timerExceed = false

    // if task if further in future than TIMEOUT_MAX
    // split the runs up and use TIMEOUT_MAX for the run
    if(delta > TIMEOUT_MAX){
      delta = TIMEOUT_MAX
      timerExceed = true
    }

    timer = setTimeout((index, timerExceed) => {
      // if timer did not exceed TIMEOUT_MAX 
      // finish it with executing callback and removing task
      if(!timerExceed){
        // run callback for finished task
        callback(tasks[index].payload, tasks[index])
    
        // remove finished task
        tasks.splice(index, 1)
      }

      // get task that will finish next
      const newTaskIndex = getNextTaskId()

      if(tasks.length)
        return start(tasks[newTaskIndex], newTaskIndex)

      runningIndex = -1
    }, delta, index, timerExceed)
  }

  return {
    add
  }
}

exports.create = create
