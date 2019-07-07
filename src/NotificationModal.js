import React from 'react';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal'
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';

class NotificationModal extends React.Component {
    state={
        open:false
    }
    handleClose=() =>{
        this.setState({open: false});
    }
    showNotifications = (evt) =>{
        console.log("Click")
        this.setState({open:true})    
    }

    render() {
    if(this.props.data){
        let newArr=[];
        let reversedArray = [...this.props.data.forms.forms].reverse();
        reversedArray.map(el=>{
            if((el.approver===localStorage.getItem('username') && el.status==="Pending") ||
             ((el.creator===localStorage.getItem('username') && (el.status==="Approved" || el.status==="Rejected")))){
                newArr.push(el)
             }
        })

    return (
        <div>
            <Badge badgeContent={newArr.length} color="secondary">
                <NotificationsIcon onClick={this.showNotifications} />                
            </Badge>
            
            <Modal open={this.state.open} onClose={this.handleClose} style={{padding:'auto',paddingTop:10,width:'400',marginRight:'20%',marginLeft:'20%',border:'none'}}>
                <List>
                    {reversedArray.map(el=>{
                    if((el.approver===localStorage.getItem('username') && el.status==="Pending")){
                        return (
                        <Paper key={el._id} style={{position: 'relative', width: 'auto',  
                                        outline: 'none'}} >                                              
                        <ListItem >    
                        <ListItemAvatar>
                            <Avatar>
                            <i className="material-icons" style={{color:'darkblue'}}>
                            person
                            </i>
                            </Avatar>
                        </ListItemAvatar>                        
                        <ListItemText>
                            <div ><b>{el.creator}</b> has requested a form {el.status.toLowerCase()} for your approval.</div>
                            </ListItemText>
                        </ListItem>
                        </Paper>
                            )
                    }
                    else if((el.creator===localStorage.getItem('username') && (el.status==="Approved" || el.status==="Rejected"))){
                        return (
                            <Paper key={el._id} style={{position: 'relative', width: 'auto',  
                                            outline: 'none'}} >                      
                            <ListItem >   
                            <ListItemAvatar>
                                <Avatar>
                                <i className="material-icons" style={{color:'darkblue'}}>
                                person
                                </i>
                                </Avatar>
                            </ListItemAvatar>                             
                            <ListItemText>
                                <div ><b>{el.approver}</b> has {el.status.toLowerCase()} your request.</div>
                                </ListItemText>
                            </ListItem>
                            </Paper>
                                )
                    }
                    else{
                        return(
                            <div key={el._id}></div>
                        )
                    }
                    }
                    )}   
                </List>
            </Modal>
        </div>
    );}
    else{
      return (
        <div> 
            <Badge  color="secondary">
                <NotificationsIcon onClick={this.showNotifications} />
            </Badge>           
        </div>
        )
    }
  }
}

export default NotificationModal;