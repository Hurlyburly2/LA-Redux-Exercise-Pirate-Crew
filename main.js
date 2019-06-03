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
    default:
      return state;
  }
}

const createNextId = () => {
  debugger
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

const walkThePlankMatey = document.getElementById('walk-the-plank')
walkThePlankMatey.addEventListener('click', () => {
  alert('fjsdal')
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
