import React from 'react';
import {  Typography,FormControl, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import './App.css';
import AvailabilityIcon from './AvailabilityIcon';


class SignupPage extends React.Component { 
   
    constructor(props){
        super(props)
        this.state={          
          newUser:{
            username:'',
            password:'',
            department:'D1'
        },
        deptOptions: ['D1', 'D2', 'D3'],
        usernameAvailable:false,
        error:''
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    onChange=(evt)=>{
        console.log(evt.target.name,evt.target.value)
        let value = evt.target.value;
        let name = evt.target.name; 
        this.setState( prevState => {
            return { 
               newUser : {
                        ...prevState.newUser, [name]: value
                       }
            }
         }, () => console.log(this.state.newUser)
         )               
    }
    onChangeUsername=(evt)=>{
        console.log(evt.target.name,evt.target.value)
        let value = evt.target.value;
        let name = evt.target.name; 
        this.setState( prevState => {
            return { 
               newUser : {
                        ...prevState.newUser, [name]: value
                       }
            }
         }, () => console.log(this.state.newUser)
         )
         
        axios.get(`https://secure-depths-88479.herokuapp.com/users`)
        .then(res => {
        // console.log(res);
        console.log(res.data.usersList.users); 
        var ans= res.data.usersList.users.some(function (el) { 
            if(el.username === value){
                return true
            }
          })

        if(ans){
            this.setState({usernameAvailable:false})
            console.log("User name already taken")
        }
        else{
            this.setState({usernameAvailable:true})
            console.log("Available")
        } 
        })
        .catch(error=>{
            console.log(error)                       
        }) 
    }

    handleSubmit= (evt)=>{
        evt.preventDefault();
        const username= this.state.newUser.username;
        const password= this.state.newUser.password;
        const dept= this.state.newUser.department;
        
        const user = {
            username: username,
            password:password,
            department:dept
          };
        // this.props.dispatch(authorize(username,password));
        console.log(username,password,dept,this.state.usernameAvailable)
        if(username && password && dept ){
          if(this.state.usernameAvailable){
            axios.post(`https://secure-depths-88479.herokuapp.com/signUp`,  user )
            .then(res => {
            console.log(res);
            console.log(res.data);            
            this.props.changeStateHandler();
            this.setState({error:''})
            
            })
            .catch(error=>{
                this.setState({error:'Invalid entries'})
                console.log(error)
            }            
            )
          }
          else{
            this.setState({error:'Username already taken'})
             
          }
        }
        else{
            this.setState({error:'Fields cannot be empty'})
            console.log("Fields cannot be empty")
        }
       
    }
    handleLogin = () =>{
        this.props.changeStateHandler();
    }
    handleClickShowPassword = () =>{
        this.setState(state=>({showPassword : !state.showPassword}));
    }
    changeStateHandler =()=>{
        this.setState({signup:false})
    }

    render() {
        return (  
            <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div style={{marginTop: 50}}>
              
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              {this.state.error && <div style={{color:'red',textAlign:'center'}}>{this.state.error}</div>}
              <form onSubmit={(evt)=>this.handleSubmit(evt)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                        id="input" type="text"
                        variant="outlined"
                        name="username"
                        label="Username"
                        fullWidth
                        required
                        autoFocus
                        margin="normal"                         
                        onChange={e=>{this.onChangeUsername(e)}}                        
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={12}>
                    <AvailabilityIcon  data={this.state.usernameAvailable}/>
                  </Grid> */}
                  {this.state.newUser.username ? 
                    (this.state.usernameAvailable ?
                      <div style={{color:'green',textAlign:'center'}}>Username available</div>:<div style={{color:'red',textAlign:'center'}}>Username already taken</div>): ''}
                  <Grid item xs={12} sm={12}>
                  <TextField
                        id="filled-adornment-password" 
                        name="password"
                        label="Password"
                        fullWidth
                        required
                        margin="normal"
                        type={this.state.showPassword ? 'text':'password'}
                        variant="outlined"
                        onChange={e=>{this.onChange(e)}}
                        InputProps={{
                            endAdornment:(
                                <InputAdornment  position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                            >
                                        {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    </Grid> 
                    <Grid item xs={4} sm={4}>                     
                    <Typography style={{paddingTop:'20px'}}>
                        <label  >Department </label> 
                    </Typography> 
                    </Grid> 
                    <Grid item xs={8} sm={8}>  
                        <FormControl variant="outlined"  >
                            <Select
                            native                            
                            required
                            fullWidth
                            name="department"     
                            style={{minWidth:'200px'}} 
                            value={this.state.newUser.department}                                       
                            onChange={e=>{this.onChange(e)}}
                            input={
                                <OutlinedInput name="department"  id="outlined-simple" />
                            }
                            >
                            <option  disabled>--select--</option>
                            {this.state.deptOptions.map(option => {
                                return (
                                <option
                                    key={option}
                                    value={option}
                                    label={option}>{option}
                                </option>
                                );
                            })}
                            </Select>  
                            </FormControl> 
                    </Grid>                
                </Grid>
                <br/>
                <br/>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"                  
                  onClick = {this.handleSubmit}
                >
                  Sign Up
                </Button>
                <br/>
                <br/>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2" onClick={this.handleLogin}>
                      Already have an account? Log in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
    );
  }
}


export default SignupPage;