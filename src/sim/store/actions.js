/*
 * action types
 */
export const SET_PERSON = 'SET_PERSON'
export const SET_VARS = 'SET_VARS'

/*
 * action creators
 */

export function setPerson(what,value) {
  return { type: SET_PERSON, payload: {what, value} }
}

export function setVars(what,value) {
  return { type: SET_VARS, payload: {what, value} }
}
