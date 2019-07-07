import React, { Component } from 'react';
import LoginPage from './Login';
import Home from './Home';
import './App.css';

class App extends Component {  
  constructor(props){
    super(props)
    this.state={
      loggedin: false
    }
  }
  changeLogoutStateHandler=()=>{
    localStorage.removeItem('username')
    localStorage.removeItem('department')
    this.setState({loggedin:false})
  }
  changeLoginStateHandler=()=>{
      this.setState({loggedin:true});       
      console.log("Fetched", localStorage.getItem('username'))
  }
  render() {
    if (localStorage.getItem('username')){
      return(
        <div className="App">        
        <div className="row"> 
            <div className="col-md-10">              
              <Home changeLogoutStateHandler={this.changeLogoutStateHandler}/>
            </div>            
        </div>
                
        </div>
        
      )
    }
    else{
      return(
        <div className="App">        
          <div className="row">
            <div className="col-md-6 col-md-offset-2">
              <LoginPage changeLoginStateHandler={this.changeLoginStateHandler}/>
            </div>          
          </div>
        </div>
        
      )
    }
    
    
  }
}

export default App;
