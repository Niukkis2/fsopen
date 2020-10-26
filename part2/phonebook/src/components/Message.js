import React from 'react'

const Message = (props) => {
    if (props.message === null) {
        return null
    }
    return (
        <div className={props.className}>
            {props.message}
        </div>
    )
}

export default Message