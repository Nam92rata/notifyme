import React from 'react';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

class RequestPage extends React.Component {
  handleApprove = (id) =>{
    console.log("To approve form id : ", id) 
    const form =
        [{propName:'status',
        value:'Approved'} ]
    
    axios.patch(`https://secure-depths-88479.herokuapp.com/forms/${id}`, form)
    .then(res => console.log(res.data))
    .catch(error=>{
      console.log(error);
    });
    }

  handleReject = (id) =>{
    console.log("To reject form id : ", id)
    const form =[{      
      propName:'status',
      value:'Rejected'      
  }]
  console.log(form);
    axios.patch(`https://secure-depths-88479.herokuapp.com/forms/${id}`, form)
    .then(res => console.log(res.data))
    .catch(error=>{
      console.log(error);
    })
    }
  
  render() {
    if(this.props.data){
      var newArr=[];
      let reversedArray = [...this.props.data.forms.forms].reverse();
      reversedArray.map(el=>{                    
        if(el.approver===localStorage.getItem('username') && el.status==="Pending"){
          newArr.push(el)
      }})   
      
    return (
        <div>
            <Container component="main" >
              <CssBaseline />
                <h2>Requests</h2>                
                  <List >
                  {newArr.map(el=>{
                      return (
                        <div key={el._id}>
                        <Paper style={{  padding: 10,width:"auto", height: "auto", borderRadius:"25px"}} >  
                          <ListItem>
                                <ListItemAvatar>
                                  <Avatar>
                                  <i className="material-icons" style={{color:'darkblue'}}>
                                    person
                                    </i>
                                  </Avatar>
                                </ListItemAvatar>
                                <ListItemText>                                  
                                    <div key={el._id}><b>{el.creator}</b> has requested a  form {el.status.toLowerCase()} with you.
                                    <br/>
                                      <div>Message: <span style={{color:'#090eea'}}><b><i>{el.case}</i></b></span></div>
                                    </div>                                  
                                </ListItemText>
                                <ListItemSecondaryAction>                                  
                                    <Button variant="contained" color="primary" onClick={this.handleApprove.bind(this,el._id)} >
                                      Approve                                      
                                    </Button> 
                                    <Button variant="contained" color="secondary" onClick={this.handleReject.bind(this,el._id)} >
                                      Reject                                      
                                    </Button>
                                </ListItemSecondaryAction>
                              </ListItem> 
                      </Paper>
                      <br/>
                      </div>
                          )      
                    })}
                  </List>
            </Container>
        </div>
    );}
    else{
      return (
        <div>
            <section>
                <h2>No Requests</h2> 
            </section>
        </div>
    )
    }
  }
}

export default RequestPage;