
import React from 'react';
import 'materialize-css'
import {AuthContext} from './context/AuthContext.js'
import {useRoutes} from './routes.js'
import {BrowserRouter as Router} from 'react-router-dom'
import {useAuth} from './hooks/auth.hook.js'


function App() {
  const {token, userId, userName, login, logout} = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  return (
    <AuthContext.Provider value={{
      token, userId, userName, login, logout, isAuthenticated
    }}>
      <Router>
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
