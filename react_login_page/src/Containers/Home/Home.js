import React, {useState, useEffect} from 'react'
import axios from '../../axios-orders'
import { connect } from "react-redux"

const Home = (props) => {
  const [currentUserData, setCurrentUserData] = useState({})
  const [allUserData, setAllUserData] = useState({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    axios.get( `/orders.json?auth=${token}&orderBy="userId"&equalTo="${props.userId}"`)    
    .then(response => {
      setCurrentUserData(response.data)
    })
    axios.get( `/orders.json?auth=${token}&orderBy="userId"`)    
    .then(response => {
      setAllUserData(response.data)
    })
    
  }, [props.userId])

  return (
    <div>
      <h1>This is the home page</h1>
      <button onClick={()=> props.history.push("/logout")}>
        Log Out
      </button>
      <h1>Data for Current User is:</h1>
      <h2>{JSON.stringify(currentUserData)}</h2>
      <h1>Data for All User is:</h1>
      <h2>{JSON.stringify(allUserData)}</h2>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps, null)(Home);
