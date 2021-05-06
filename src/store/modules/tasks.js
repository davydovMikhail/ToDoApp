import axios from 'axios'
import Vue from "vue"

const api = process.env.VUE_APP_BASE_API

const state = () => ({
  tasks: [],
  taskError: ''
})

const getters = {
  allCurrentTodoTasks: state => state.tasks.sort((a, b) => {
    return a.created_at > b.created_at ? -1 : 1
  }),
  allCurrentTasksLength: state => state.tasks.length,
  doneTasks: (state, getters) => getters.allCurrentTodoTasks.filter(task => task.is_completed),
  doneTasksLength: (state, getters) => getters.doneTasks.length,
  tasksError: state => state.taskError,
  checkIfTasksCompleted: (state, getters) => {
    if (getters.allCurrentTasksLength === getters.doneTasksLength) {
      return true
    } else {
      return false
    }
  }
}

const actions = {
  async fetchTasks({ commit }, id) {
    try {
      commit('setTaskError', '')
      const response = await axios.get(`${api}/tasks`)
      let currTasks = response.data.filter(task => task.list_id === id)
      commit('setTasks', currTasks)
    } catch(e) {
      commit('setTaskError', e.message)
      Vue.$vToastify.error(e.message)
    }
  },

  async addTask({ commit }, newTask) {
    try {
      commit('setTaskError', '')
      const response = await axios.post(`${api}/tasks`, newTask)
      commit('addNewTask', response.data)
    } catch (e) {
      commit('setTaskError', e.message)
      Vue.$vToastify.error(e.message)
    }
    
  },

  async deleteTask({ commit }, taskId) {
    try {
      commit('setTaskError', '')
      await axios.delete(`${api}/tasks/${taskId}`)
      commit('deleteOneTask', taskId)
    } catch (e) {
      commit('setTaskError', e.message)
      Vue.$vToastify.error(e.message)
    }
  },

  async toggleTaskCompletion({ commit }, task) {
    try {
      commit('setTaskError', '')
      await axios.put(`${api}/tasks/${task.id}`, task)
    } catch (e) {
      commit('setTaskError', e.message)
      Vue.$vToastify.error(e.message)
    }
  },
}

const mutations = {
  setTaskError: (state, error) => state.taskError = error,
  setTasks: (state, tasks) => state.tasks = tasks,
  addNewTask: (state, task) => state.tasks.unshift(task),
  deleteOneTask: (state, taskId) => state.tasks = state.tasks.filter(task => task.id !== taskId),
}

export default {
  state,
  getters,
  actions,
  mutations
}