import React from "react";
import {LOCAL_TIMEZONE} from "./worldtime";

export function Clock(props) {
    const defaultTimerClassName = props.nameDefaultZone === props.timezone ? 'clock--default' : ''
    const defaultTileClassName = props.nameDefaultZone === props.timezone ? 'clock-title--default' : ''

    return (
        <div className={`clock ${defaultTimerClassName}`}>
            <strong className={`clock-title ${defaultTileClassName}`}> {props.timezone || LOCAL_TIMEZONE} </strong>
            <p>{ props.appDate.toLocaleTimeString("ru-RU", {
                timeZone: props.timezone || LOCAL_TIMEZONE })
            }</p>

            <div className="close" onClick={() => props.onClickRemoveHandler(props.idInstance)}></div>
        </div>
    );
}
