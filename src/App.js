import './App.css';

import CenteredTabs from './components/CenteredTabs'
import EventDetails from './components/EventDetails'
import SessionList from './components/SessionList'
import SponsorsList from './components/SponsorList'
import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
      event: undefined,
      sponsors: undefined,
      schedule: undefined,
      speakers: {},
    }
  }

 tabChanged = (value) => {
   this.setState(prevState => ({
     tabValue: value
   }));
 };

 eventAquired = (event) => {
   this.setState(prevState => ({
     event: event,
   }));
 }

 sponsorsAquired = (sponsors) => {
   this.setState(prevState => ({
     sponsors: sponsors
   }));
 }

 sessionsAquired = (sessions) => {
   this.setState(prevState => ({
     sessions: sessions
   }));
 }

 speakersAquired = (speakers) => {
   this.setState(prevState => ({
     speakers: speakers
   }));
 }

 eventDetails = () => {
   return (
     <EventDetails
       event={this.state.event}
       onChangeCallback={this.eventAquired}/>
   )
 }

 eventSponsors = () => {
   return (
     <SponsorsList
       sponsors={this.state.sponsors}
       onChangeCallback={this.sponsorsAquired}/>
   )
 }

 eventSchedule = () => {
   return (
     <SessionList
       sessions={this.state.sessions}
       speakers={this.state.speakers}
       sessionsAquired={this.sessionsAquired}
       speakersAquired={this.speakersAquired} />
   )
 }

  render() {
    return (
      <div className="App">
        <CenteredTabs onChangeCallback={this.tabChanged}/>
        {this.state.tabValue === 0 ? this.eventDetails() : ''}
        {this.state.tabValue === 1 ? this.eventSchedule() : ''}
        {this.state.tabValue === 2 ? this.eventSponsors() : ''}
      </div>
    )
  }
}

export default App;
