export const missionAccomplished = () => {
    let missionAccomplished = localStorage.getStuff('missionAccomplished')
    let notDoneActivity = localStorage.getStuff('notDoneActivity')

    activityHasBeenDone = true;

    missionAccomplished.push(chosenActivity)
    notDoneActivity = notDoneActivity.filter(item => item.id !== chosenActivity.id)

    localStorage.setStuff('missionAccomplished', missionAccomplished)
    localStorage.setStuff('notDoneActivity', notDoneActivity)
}