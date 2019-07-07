import React from 'react';
import {  Typography,Fab, FormControl, TextField } from '@material-ui/core';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
class FormPage extends React.Component {
  constructor(props){
    super(props)
    this.state={          
      newForm:{        
        approver:'',
        department:'',
        message:''
    },
    deptOptions: ['D1', 'D2', 'D3'],
    users:[],
    open:false,
    error:''
    }
    this.handleSubmit=this.handleSubmit.bind(this);
}

onChange=(evt)=>{  
    let value = evt.target.value;
    let name = evt.target.name; 
    this.setState( prevState => {
        return { 
           newForm : {
                    ...prevState.newForm, [name]: value
                   }
        }
     }, () => console.log("On change", this.state.newForm)
     )
              
}

onChangeSelect = (evt)=>{
  let value = evt.target.value;
  let name = evt.target.name;
  this.setState( prevState => {
    return { 
       newForm : {
                ...prevState.newForm, [name]: value
               }
    }
 }, () => console.log("On change", this.state.newForm)
 )
   
  axios.get(`https://secure-depths-88479.herokuapp.com/users/${value}`)
     .then(res => {
    //    console.log("Form ",res.data);
       this.setState({users: res.data.usersList.users});    
       })
     .catch(error=>{
         console.log(error)
     })
}

handleSubmit= (evt)=>{
    evt.preventDefault();
    const creator=localStorage.getItem('username');
    const creatordept=localStorage.getItem('department');
    const approver= this.state.newForm.approver;    
    const dept= this.state.newForm.department;   
    const message= this.state.newForm.message; 
    let status = "Pending"
    const form = {
        creator:creator,
        creatorDepartment:creatordept,
        approver: approver,        
        approverDepartment:dept,
        case:message,
        status:status
      };      
    if(creator && creatordept && approver && dept && message){
        axios.post(`https://secure-depths-88479.herokuapp.com/forms`,  form )
        .then(res => {
        console.log(res.data);   
        this.setState( prevState => {
            return { 
               newForm : {
                        ...prevState.newForm, message: "",approver:"", department:""
                       }
            }
         }, () => console.log("On submit", this.state.newForm)
         )
         this.handleClick();
         this.setState({error:''})
    })
        .catch(error=>{
            this.setState({error:'Invalid entries'})
            console.log(error)
        }        
        )
    }   
    else{
        this.setState({error:'Empty fields not allowed'})
        console.log("Empty not allowed")
    } 
}
    handleClick() {
        this.setState({open:true});
  }

    handleClose() {
    this.setState({open:false});
  }
  
render() {      
    return (  
        <Container component="main" maxWidth="xs">
            <CssBaseline />
                <div style={{marginTop: 50}}>
              
              <Typography component="h1" variant="h4">
                Create a Form
              </Typography>
              <br/>
              {this.state.error && <div style={{color:'red',textAlign:'center'}}>{this.state.error}</div>}
              <br/>
              <form onSubmit={(evt)=>this.handleSubmit(evt)}>
                <Grid container spacing={2}> 
                    <Grid item xs={4} sm={4}>                     
                    <Typography style={{paddingTop:'20px'}}>
                        <label  >Department </label> 
                    </Typography> 
                    </Grid>       
                    <Grid item xs={8} sm={8}>
                   
                    <FormControl variant="outlined" >                        
                            <Select
                            native                            
                            required
                            fullWidth
                            style={{minWidth:'200px'}} 
                            name="department"     
                            value={this.state.newForm.department}                                       
                            onChange={e=>{this.onChangeSelect(e)}}
                            input={
                                <OutlinedInput name="department"  id="outlined-simple" />
                            }
                            >
                            <option >--select--</option>
                            {this.state.deptOptions.map(option => {
                            if(option!==localStorage.getItem('department')){
                            return (
                            <option
                                key={option}
                                value={option}
                                label={option}>{option}
                            </option>
                            )}
                            else{
                                return null;
                            }
                        })}
                            </Select>  
                        </FormControl>
                  </Grid>
                               
                  <Grid item xs={4} sm={4}>                     
                    <Typography style={{paddingTop:'20px'}}>
                        <label  >Approver </label> 
                    </Typography> 
                    </Grid>
                  <Grid item xs={8} sm={8}>  
                    <FormControl variant="outlined" style={{minWidth: 120}} >
                        
                            <Select
                            native                            
                            required
                            style={{minWidth:'200px'}}
                            name="approver"     
                            value={this.state.newForm.approver}                                       
                            onChange={e=>{this.onChange(e)}}
                            input={
                                <OutlinedInput name="approver"  id="outlined-approver-simple" />
                            }
                            >
                            <option  >--select--</option>
                            {this.state.users.map(option => {
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

                    <Grid item xs={12}> 
                    
                        <TextField
                            id="input-message" type="text"
                            name="message"
                            label="Message"                                    
                            fullWidth
                            required
                            margin="normal"
                            variant="filled"
                            value={this.state.newForm.message} 
                            onChange={e=>{this.onChange(e)}}                                             
                        />                        
                    </Grid>                
                </Grid>
                <br/>
                
                <Fab variant="extended" color="primary" aria-label="Add"
                    onClick = {this.handleSubmit} >
                    Send Form
                </Fab>
                <br/>
                
                <div style={{backgroundColor: 'green'}} >
                <Snackbar
                    open={this.state.open? true: false}
                    autoHideDuration={2000}                                             
                    message={<span id="snackbar-fab-message-id" style={{ display: 'flex',alignItems: 'center'}}>Form submitted successfully !</span>}
                    
                    action={
                        <IconButton key="close" aria-label="Close"  onClick={this.handleClose.bind(this)}>
                            <CloseIcon  />
                        </IconButton>
                    }                    
                    />
                </div>

                <br/>   
              </form>
            </div>
          </Container>
);
}
}

export default FormPage;