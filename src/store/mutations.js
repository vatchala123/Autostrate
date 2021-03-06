import Vue from 'vue'

// Helper functions for mutations (to remove duplicate code)
function createId (prefix) {
  let timestamp = Date.now()
  let id = prefix + '_' + timestamp
  return id
}
function insertColumn (state, projectId, index) {
  let id = createId('c')
  let column = {
    id,
    chord: '',
    melody: '',
    rule: state.projects[projectId].default_rule
  }
  Vue.set(state.projects[projectId].columns, id, column)
  state.projects[projectId].column_order.splice(index, 0, id)
}

export default {
  newProject (state) {
    let id = createId('p')
    let project = {
      id: id,
      name: '',
      key: '',
      default_rule: '',
      instrument_order: [],
      instruments: {
      },
      column_order: [],
      columns: {
      }
    }
    Vue.set(state.projects, id, project)
    state.project_order.push(id)
    state.current_project_id = id
  },
  setCurrentProject (state, projectId) {
    state.current_project_id = projectId
  },
  removeProject (state, projectId) {
    if (state.project_order.length === 1) {
      window.alert('You only have one project. \nMake a new one before deleting it.')
    } else {
      Vue.delete(state.projects, projectId)
      var index = state.project_order.indexOf(projectId)
      Vue.delete(state.project_order, index)
    }
  },
  updateProjectProperty (state, [projectId, property, value]) {
    state.projects[projectId][property] = value
  },
  pushColumn (state, projectId) {
    let index = state.projects[projectId].column_order.length // end of columns
    insertColumn(state, projectId, index)
  },
  insertColumnAtIndex (state, [projectId, index]) {
    insertColumn(state, projectId, index)
  },
  insertColumnBeforeId (state, [projectId, columnId]) {
    let index = state.projects[projectId].column_order.indexOf(columnId)
    insertColumn(state, projectId, index)
  },
  updateColumn (state, [projectId, key, column]) {
    state.projects[projectId].columns[key] = column
  },
  removeColumn (state, [projectId, columnId]) {
    Vue.delete(state.projects[projectId].columns, columnId)
    var index = state.projects[projectId].column_order.indexOf(columnId)
    Vue.delete(state.projects[projectId].column_order, index)
  },
  updateProjectDefaultRule (state, [projectId, rule]) {
    state.projects[projectId].default_rule = rule
  },
  addInstrument (state, projectId) {
    let id = createId('i')
    let instrument = {
      id,
      name: '',
      key: 'C'
    }
    Vue.set(state.projects[projectId].instruments, id, instrument)
    state.projects[projectId].instrument_order.push(id)
  },
  updateInstrumentProperty (state, [projectId, instrumentId, property, value]) {
    state.projects[projectId].instruments[instrumentId][property] = value
  },
  removeInstrument (state, [projectId, instrumentId]) {
    Vue.delete(state.projects[projectId].instruments, instrumentId)
    var index = state.projects[projectId].instrument_order.indexOf(instrumentId)
    Vue.delete(state.projects[projectId].instrument_order, index)
  }
}
