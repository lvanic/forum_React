import { useEffect, useState } from "react";
import { connect } from "react-redux";


function Recomendations(props)//TODO:add tags
{     
    return(
        <div style={{ width:'15%', height:'1000px', display:'flex', float:'right'}}>
            <div style={{width:'100%', backgroundColor:'lightgrey', height:'200px', borderRadius:'5px', marginTop:'10px', marginRight:'10px'}}>
                <div style={{backgroundColor:'grey', width:'100%', height:'40px', borderRadius:'5px 5px 0% 0%', textAlign:'center',fontSize:'18px', verticalAlign:'middle'}}>{props.language.related}</div>
                {/* {props.tags.map((x, i) => (
                    i != 3?
                    <div key={i} style={{backgroundColor:'lightgrey', width:'100%', borderTop:'2px solid darkgrey', height:'40px', textAlign:'center',fontSize:'18px', verticalAlign:'middle'}}>{props.tags[i]}</div>
                    :
                    <div key={i} style={{backgroundColor:'lightgrey', borderRadius:'0% 0% 5px 5px', borderTop:'2px solid darkgrey', width:'100%', height:'40px', textAlign:'center',fontSize:'18px', verticalAlign:'middle'}}>{props.tags[i]}</div>
                    
                ))} */}
            </div>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return{
      language : state.language
    }
  }

export default connect(mapStateToProps)(Recomendations);