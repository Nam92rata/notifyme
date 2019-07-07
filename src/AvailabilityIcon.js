import React from 'react';


const AvailabilityIcon=(props)=>{
    if(props.data){
        return (
            // <i className="material-icons" style={{fontSize:'50px', marginTop:'auto',color: 'green'}}>
            //     check
            // </i>
            <div style={{color: 'green'}}>Username available</div>
        )}
        else{
            return(
                // <i class="material-icons" style={{fontSize:'50px', marginTop:'auto',color: 'red'}}>
                //     close
                // </i>
                <div style={{color: 'red'}}>Username already taken</div>
            )
        }
   
}


export default AvailabilityIcon;