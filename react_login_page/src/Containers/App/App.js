import React, {useEffect} from 'react';
import { Route, Switch, BrowserRouter, withRouter, Redirect } from 'react-router-dom'
import Auth from '../Auth/Auth.js'
import Home from '../Home/Home.js'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index.js'
import Logout from '../Auth/Logout/Logout.js'


const App = (props) => {
  useEffect(() => {
    props.onTryAutoSignUp()
  }, [])

  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/logout" exact component={Logout} />
      <Redirect to="/auth" />
    </Switch>
  )

  if(props.isAuthenticated){
    routes = (
      <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/logout" exact component={Logout} />
          <Redirect to="/" />
        </Switch>
    )
  }

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routes}
        </Switch>
        </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));