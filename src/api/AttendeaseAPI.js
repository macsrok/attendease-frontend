  const createDateFromInstance = (instance) => {
    return new Date(`${instance.date_formatted} ${instance.time}`);
  }

  const sortInstances = (instances) => {
    instances.sort(function(instanceOne, instanceTwo) {
      return createDateFromInstance(instanceOne) - createDateFromInstance(instanceTwo);
    });
    return instances;
  }

  const sortSessions = (sessions) => {

    const sessionsWithoutInstances = []; // temp arr for sessions without instances
    const sessionsWithinstances = []; // temp arr for sessions with instances

    sessions.forEach(function (session) { // loop through each session.
      if (session.instances.length > 0) { // if the session has instances
        if (session.instances.length > 1 ) { // and the number of instances is greater than one
          session.instances = sortInstances(session.instances); // sort the instances
        }
        sessionsWithinstances.push(session); // and add the session to the tmp arr for sessions with instances
      }else{
        sessionsWithoutInstances.push(session); // if the session does not have any instances add it to the tmp arr for sessions without instances
      }
    });

    // now that the instances have been sorted by date
    // sort the sessions based on the first instance
    const sorted = sessionsWithinstances.sort(function(sessionOne, sessionTwo) {
      return createDateFromInstance(sessionOne.instances[0]) - createDateFromInstance(sessionTwo.instances[0]);
    });

    //add the sessions without instances to the end of the sorted arr
    // return the result
    return sorted.concat(sessionsWithoutInstances);
  }

  class AttendeaseAPI {
    constructor() {
      this.baseURL = 'https://new-conference-template.attendease.com';
      this.eventURL = '/api/properties.json';
      this.sponsorsURL = '/api/sponsors.json';
      this.sessionsURL = '/api/sessions.json';
      this.speakersURL = '/api/speakers.json';
      this.useCorsProxy = "true";
    }

    async fireNetworkRequest(url) {

      try {
        const res = await window.fetch(url);
        const jsonRes = await res.json();
        this.jsonObject = jsonRes;
        return this.jsonObject;
      }catch(e){
        return {error:e};
      }

    }

    async getAttendeaseEvent() {
      const url = {
        true: `https://cors-anywhere.herokuapp.com/${this.baseURL}${this.eventURL}`,
        false: `${this.baseURL}${this.eventURL}`
      }[this.useCorsProxy];
      return await this.fireNetworkRequest(url);
    }

    async getAttendeaseEventSponsors() {
      const url = {
        true: `https://cors-anywhere.herokuapp.com/${this.baseURL}${this.sponsorsURL}`,
        false: `${this.baseURL}${this.sponsorsURL}`
      }[this.useCorsProxy];
      return await this.fireNetworkRequest(url);
    }

    async getAttendeaseEventSessions() {
      const url = {
        true: `https://cors-anywhere.herokuapp.com/${this.baseURL}${this.sessionsURL}`,
        false: `${this.baseURL}${this.sessionsURL}`
      }[this.useCorsProxy];
      const sessions = await this.fireNetworkRequest(url);
      return sortSessions(sessions)
    }

    async getAttendeaseEventSpeakers() {
      const url = {
        true: `https://cors-anywhere.herokuapp.com/${this.baseURL}${this.speakersURL}`,
        false: `${this.baseURL}${this.sessionsURL}`
      }[this.useCorsProxy];
      return await this.fireNetworkRequest(url);
    }


  }

  export default AttendeaseAPI;
