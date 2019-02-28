class AttendeaseAPI {
  constructor(component) {
    this.baseURL = 'https://new-conference-template.attendease.com';
    this.eventURL = '/api/properties.json';
    this.corsProxy = true;
    this.callingComponent = component;
  }

  getAttendeaseEvent() {
    let url = '';
    if (this.corsProxy === true) {
       url = `https://cors-anywhere.herokuapp.com/${this.baseURL}${this.eventURL}`
     }else{
       url = `${this.baseURL}${this.eventURL}`
    }
    window.fetch(url, {headers :{
      "origin" : "localhost"
    }})
      .then(res => res.json())
      .then(
        (result) => {
          this.callingComponent.setState({
            event : result,
            isLoaded: true
          });
        },
        (error) => {
          this.callingComponent.setState({
            errpr : error,
          });
        }
      );
  }
}

export default AttendeaseAPI;
