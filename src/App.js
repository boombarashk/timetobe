import React from 'react';
import {Form} from "./form";
import {Clock} from "./clock";

import './App.css';

{/*<strong>Время есть отношение бытия к небытию.</strong>*/}
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.storageNameZones = 'TIMEZONESSTR'
    this.storageNameDefaultZone = 'TIMEZONEDEF'
    this.state = {
      data: new Map()/*this.init()*/,
      appDate: new Date(),
      defaultZone: localStorage.getItem(this.storageNameDefaultZone)
    }

    this.init = this.init.bind(this)
    this.onClickAddTimerHandler = this.onClickAddTimerHandler.bind(this)
    this.onClickRemoveHandler = this.onClickRemoveHandler.bind(this)
  }

  componentDidMount() {
    this.init()

    this.timerID = setInterval(
        () => this.tick(),
        1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      appDate: new Date()
    });
  }

  render() {
    return (
        <div className="App">
          <header className="App-header">
            <Form
                onClickAddTimerHandler={ this.onClickAddTimerHandler }
                onSaveDefaultTimezone={ name => {
                  this.setState({defaultZone: name})
                  localStorage.setItem(this.storageNameDefaultZone, name)
                }}
                nameDefaultZone = {this.state.defaultZone }
            />
          </header>

          <div className="App-body">
            { Array.from(this.state.data.values()).map(hours => (
                <Clock timezone={ hours.nameTimeZone }
                       idInstance = { hours.id }
                       key={ hours.id }
                       appDate={ this.state.appDate }
                       onClickRemoveHandler = { this.onClickRemoveHandler }
                       nameDefaultZone = {this.state.defaultZone }
                />
            )) }

          </div>
        </div>
    );
  }

  init() {
    const storageData = localStorage.getItem(this.storageNameZones)
    const timezonesArray = storageData ? storageData.split(';') : []
    const timezonesMap = new Map()

    timezonesArray.forEach( timezone => {
      if (timezone) {
        const instance = this.newInstance(timezone)
        timezonesMap.set(instance.id, instance)
      }
    })
    this.setState({data: timezonesMap})
  }

  newInstance(timezone) {
    const idInstance = makeId(10)
    return {id: idInstance, nameTimeZone: timezone}
  }

  onClickAddTimerHandler(timezone) {
    const timezonesMap = this.state.data
    const instance = this.newInstance( timezone )
    timezonesMap.set(instance.id, instance)

    this.setState({data: timezonesMap})
    this.storageSave(timezonesMap)
  }

  onClickRemoveHandler(id) {
    const timezonesMap = this.state.data
    timezonesMap.delete(id)

    this.setState({data: timezonesMap})
    this.storageSave(timezonesMap)
  }

  storageSave(timezonesMap) {
    localStorage.setItem(this.storageNameZones,  Array.from(timezonesMap.values())
        .map( instance => instance.nameTimeZone ).join(';'))
  }
}

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
