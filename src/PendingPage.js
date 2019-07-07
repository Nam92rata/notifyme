import React from 'react';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
class PendingPage extends React.Component {
  render() {
    if(this.props.data){
      var newArr=[];
      let reversedArray = [...this.props.data.forms.forms].reverse();
      reversedArray.map(el=>{                    
      if(el.approverDepartment===localStorage.getItem('department') && el.status==="Pending" ){
          newArr.push(el)
      }})   
      newArr=newArr.slice(0,5);
        return (
            <div>
              <Container component="main" >
              <CssBaseline />
                
                    <h2>Pending Requests</h2>                
                      {
                        newArr.map(el=>{ 
                        return (
                          <div key={el._id}>
                          <Paper key={el._id} style={{ padding: 20,width:"auto", 
                                     backgroundColor:'skyblue', height: "auto", borderRadius:"25px"}}>                      
                          
                            <b>{el.creator}</b> has posted a form which is {el.status.toLowerCase()} with <b>{el.approver}</b>.
                            <br/>
                            <div>Message: <span style={{color:'darkblue'}}><b><i>{el.case}</i></b></span></div>
                          </Paper>
                          <br/>
                          </div>
                            )   
                      })}  
                
                </Container>
            </div>
        )
    }
    else{
      return (
        <div>
            <section>
                <h2>No Pending Requests</h2> 
            </section>
        </div>
    )
    }
  }
}

export default PendingPage;