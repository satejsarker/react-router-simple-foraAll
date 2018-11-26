import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Link BrouserRouter, NavLink, Promt
import {BrowserRouter as Router, Link,NavLink,Redirect,Prompt} from 'react-router-dom';
import Route from 'react-router-dom/Route'
import Secure from './components/secure/secureRoute';
const home=()=>{return <h2>Home</h2>}
const about=()=>{return <h3>About the app </h3>}
const User=(props)=>{
  console.log(props.match.params.username)
  return (<h4 className='text-primary'>
    {props.match.params.username} Page For the Application </h4>);
}
class App extends Component {
state={
  logIn:false
}
 loginHandel=(e)=>{
  e.preventDefault();
  this.setState({
    logIn:!this.state.logIn
  });
  console.log(this.state.logIn);
}

  render() {
    const {logIn}=this.state;
    return (
      <Router>
      <div className="App">
          <nav className='navbar navbar-expand-lg bg-light'>
            <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav mr-auto'>
            <li className="nav-item active"> 
            <NavLink to='/'className="nav-link"
  activeStyle={
    {color:'green'}
  }
exact>Home</NavLink>
            </li>
            <li className="nav-item "> 
            <NavLink to='/about/' className="nav-link" exact activeStyle={
    {color:'green'}
  }>About</NavLink>
            </li>
            <li className="nav-item "> 
            <NavLink  className="nav-link" to='/user' exact > User</NavLink>
            </li>
            <li className="nav-item "> 
            <NavLink  className="nav-link" to='/secure' exact > Secure Data</NavLink>
            </li>
        </ul>
            </div>
          </nav>
          <div className="sidebar">

  <a className='active'>
  <NavLink to='/'
  
  exact
  >Home</NavLink>
  </a>
  <a ><NavLink to='/about/' exact >About</NavLink></a>
</div>
<Prompt when={!logIn} message={(location)=>{
  return location.pathname.startsWith('/secure')?'Yor are not Secure person':true
}}/>
<input type='button' className='btn btn-primary' value={logIn?'Log Out':'Log In'} onClick={this.loginHandel} />

      <Route path='/' exact={true} component={home } />
      {/* strict and exact uses  */}
      <Route path='/about/'  exact={true} strict component={about}/>
      <Route path='/user/:username' exact strict render={
          ()=>{
            // eslint-disable-next-line no-unused-expressions
            // logIn ? (<user />  ):(<Redirect to='/about/' />)
            if(logIn){
              return <User/>
            }
            else{
              return <Redirect to='/'/>
            }
          }
             }
       />

       <Route path='/secure' exact  render={()=>{
         if(!logIn){
           return <Redirect to='/' />
         }
         else{
          return <Secure />
         }
       }}/>
   </div>
      </Router>

    );
  }
}

export default App;
