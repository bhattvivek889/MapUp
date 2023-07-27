import React from "react";
function Card(props){
    return <div className="card-div">
        <pre className="card">Country:                  {props.namee}</pre>
        <pre className="card">Currency:                {props.currency}</pre>
        <pre className="card">Speed Unit:             {props.speed}</pre>
        <pre className="card">Distance Unit:        {props.distance}</pre>
        <pre className="card">Volume Unit:          {props.volume}</pre>
        <pre className="card">Timezone:               {props.timezone}</pre>
    </div>
}
export default Card;