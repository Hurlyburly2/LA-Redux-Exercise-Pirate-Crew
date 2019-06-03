const { createStore } = Redux;

const initialState = {
  currentCrewMembers: []
}

const crewReducer = (state = initialState, action) => {
  switch(action.type) {
    case ADD_PIRATE:
      const newPirateArray = state.currentCrewMembers.concat(action.newPirate)
      return Object.assign({}, state, {
        currentCrewMembers: newPirateArray
      })
    case WALK_THE_PLANK:
      let pirateArrayToDeleteFrom = state.currentCrewMembers
      const deleteFromArrayIndex = pirateArrayToDeleteFrom.indexOf(action.pirateToWalk)
      pirateArrayToDeleteFrom.splice(deleteFromArrayIndex, 1)
      return Object.assign({}, state, {
        currentCrewMembers: pirateArrayToDeleteFrom
      })
    default:
      return state;
  }
}

const createNextId = () => {
  const currentCrewMembers = store.getState().currentCrewMembers
  const pirateIds = []
  if (currentCrewMembers.length === 0) {
    return 0
  } else {
    currentCrewMembers.forEach(function(pirate) { pirateIds.push(pirate.id) })
    return Math.max(...pirateIds) + 1
  }
}

const ADD_PIRATE = 'ADD_PIRATE'

const addPirateToList = newPirate => {
  return {
    type: ADD_PIRATE,
    newPirate: newPirate
  }
}

const newPirateForm = document.getElementById('new-pirate-form')
newPirateForm.addEventListener('submit', () => {
  event.preventDefault();
  const pirateName = document.getElementById('name').value
  document.getElementById('name').value = ''
  const newPirate = {
    id: createNextId(),
    name: pirateName
  }
  store.dispatch(addPirateToList(newPirate))
})

const WALK_THE_PLANK = 'WALK_THE_PLANK'

const walkThePlank = pirateToWalk => {
  return {
    type: WALK_THE_PLANK,
    pirateToWalk: pirateToWalk
  }
}

const walkThePlankMatey = document.getElementById('walk-the-plank')
walkThePlankMatey.addEventListener('click', () => {
  event.preventDefault();
  pirateToWalk = store.getState().currentCrewMembers[0]
  store.dispatch(walkThePlank(pirateToWalk))
})

const store = createStore(crewReducer)

const crewList = document.getElementById('current-crew')
const render = () => {
  let newCrewList = []
  store.getState().currentCrewMembers.forEach(function(pirate) {
    newCrewList += `<li>${pirate.id} ${pirate.name}</li>`
  })
  crewList.innerHTML = newCrewList
}

render();
store.subscribe(render);
