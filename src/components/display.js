import React from "react";

const Display = ({description, amount, date}) => {
    return (
        <div>
        {description} <br/>
        {amount} <br/>
        {date} <br/>
        </div>
    )
}

export default Display;