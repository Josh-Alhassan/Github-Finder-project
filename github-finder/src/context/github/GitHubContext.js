import { createContext, useReducer, useState } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

export const GitHubProvider = ({children}) => {
    // const [users, setUsers] = useState([])
    // const [loading, setLoading] = useState(true)
    const initialState = {
        uses: [],
        loading: false,
    }

    const [state, dispatch] = useReducer(githubReducer, initialState)

    // Get Initial users (testing purpose)
    const fetchUsers = async () => {
        setLoading()

        const response = await fetch(`${GITHUB_URL}/users`, {
            headers : {
                Authorization: `token ${GITHUB_TOKEN}`,
            },
        })

        const data = await response.json()
        // setUsers(data)
        // setLoading(false)
        dispatch({
            type: 'GET_USERS',
            payload: data,
        })
    }

    // Set Loading
    const setLoading = () => ({type: 'SET_LOADING'})

    return <GithubContext.Provider value= {{
        users: state.users,
        loading: state.loading,
        fetchUsers
    }}>
        {children}
    </GithubContext.Provider>
}

export default GitHubProvider