import React, {useRef} from "react";
import {TIMEZONES, LOCAL_TIMEZONE} from "./worldtime";

export function Form(props) {
    const selector = useRef(null)

    return (
        <>
            <select ref={ selector }
                    defaultValue={ LOCAL_TIMEZONE }>
            {TIMEZONES.map(str => (
                <option key={str} value={str}>{str}</option>
            ))}
            </select>

            <button className="App-button"
                    onClick={() => {
                        props.onClickAddTimerHandler(selector.current.value)
                    }}
            >Добавить часы</button>
            <button className="App-button"
                    onClick={() => {
                        props.onSaveDefaultTimezone(selector.current.value)
                    }}
            >Часовой пояс по&nbsp;умолчанию</button>
        </>
    )
}
