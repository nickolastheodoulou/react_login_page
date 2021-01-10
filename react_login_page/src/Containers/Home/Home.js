import React, {useState, useEffect} from 'react'
import axios from '../../axios-orders'
import { connect } from "react-redux"

const Home = (props) => {
  const [formData, setFormData] = useState("")
  const [currentUserData, setCurrentUserData] = useState({})
  const [allUserData, setAllUserData] = useState({})
  const [newPost, setNewPost] = useState(false)

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get( `/messages.json?auth=${token}&orderBy="userId"&equalTo="${props.userId}"`)    
    .then(response => {
      setCurrentUserData(response.data)
    })
    axios.get( `/messages.json?auth=${token}&orderBy="userId"`)    
    .then(response => {
      setAllUserData(response.data)
    })
    
  }, [props.userId, token, newPost])

  useEffect(() => {
    console.log(`form data is ${formData}`)
  }, [formData])


  const handleSubmit = (e) => {
    e.preventDefault()
    const orderData = `{"post":"${formData}","userId":"${props.userId}"}`;
    axios.post('/messages.json?auth=' + token, orderData)
    .then(response => {
      setNewPost(!newPost)
      setFormData("")
      console.log(response.data)
    })
    .catch(error => {
      console.log(error)
    });
  }

  return (
    <div>
      <h1>This is the home page</h1>
      <button onClick={()=> props.history.push("/logout")}>
        Log Out
      </button>

      <form onSubmit={(e)=> handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={formData} onChange={(e) =>setFormData(e.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>

      <h1>Posts for Current User is:</h1>
      <h2>{JSON.stringify(currentUserData)}</h2>
      <h1>Posts for All User is:</h1>
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
