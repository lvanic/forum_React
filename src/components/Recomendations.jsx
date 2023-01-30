import { useEffect, useState } from "react";
import { connect } from "react-redux";
import '../css/recs.css'

function Recomendations(props)//TODO:add tags
{     
    return(
        <div className="div1">
            <div className="div2">
                <div className="div3">{props.language.related}</div>
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