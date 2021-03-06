
const initialState = {
	users: [],
	currentUser: {},
}

const setUsers = (users) => {
	return { type: "GET_ALL_USERS", users }
}

const deleteCurrentUser = (user) => {
	return { type: "DELETE_USER", user }
}

export const getAllUsers = () => dispatch => {
	fetch('http://localhost:3001/users.json', {mode: 'cors', creditials: 'include'})
		.then(res => res.json())
		.then(json => dispatch(setUsers(json)))
}

export const setCurrentUser = (user) => {
	return { type: "SET_CURRENT_USER", user }
}

export const createUser = (name, location) => dispatch => {
	fetch("http://localhost:3001/users", {
	      headers: {
	        'Accept': 'application/json',
	        'Content-Type': 'application/json'
	      },
	      method: "POST",
	      body: JSON.stringify({new_user: {name: name, location: location}})
	    })
	    .then((res) => { res.json() })
	    .then((json) =>{ console.log(json) })
	    // .catch((res) =>{ console.log(res) })
}

export const deleteUser = (user) => dispatch => {
	fetch(`http://localhost:3001/users/${user.id}`, {
		headers: {'Content-Type': 'application/json'},
		method: "DELETE"
	})
	.then(res => res.json())
	.then(json => console.log(json))
}

export default function usersReducer(state = initialState, action) {
	switch (action.type) {
		case "GET_ALL_USERS":
			return {
				...state,
				users: action.users,
			}
		case "SET_CURRENT_USER":
			return { 
				...state,
				currentUser: action.user,
			}
		case "DELETE_USER": // Update
			return {
				...state,
				users: action.users,
			}
		default:
			return state;
	}
};