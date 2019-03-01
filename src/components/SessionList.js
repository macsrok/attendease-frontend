import AttendeaseAPI from "../api/AttendeaseAPI"
import ProgressIndicator from './ProgressIndicator'
import Session from './Session'
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: '50px',
    marginLeft: '25px',
    marginRight: '25px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
});

class SessionList extends Component {

  constructor(props) {
    super(props);
    this.api = new AttendeaseAPI();
    this.sessionsAquired = this.props.sessionsAquired;
    this.speakersAquired = this.props.speakersAquired;
    this.state = {
      sessions: this.props.sessions,
      speakers: this.props.speakers,
      error: undefined,
    };
  }


  async fetchSpeakers() {
    const s = await this.api.getAttendeaseEventSpeakers();
    if (s.error) {
      this.setState(prevState => ({
        error: s.error,
      }));
    } else {
      const speakers = {};
      s.forEach((value) => {
        speakers[value.id] = value
      });

      this.setState(prevState => ({
        speakers: speakers,
      }));
      this.speakersAquired(speakers);
    }
  }



  async fetchSessions() {
    await this.fetchSpeakers();
    const s = await this.api.getAttendeaseEventSessions();
    if (s.error) {
      this.setState(prevState => ({
        error: s.error,
      }));
    } else {
      this.setState(prevState => ({
        sessions: s,
      }));
    }
    this.sessionsAquired(s);
  }



  buildSession(session) {
    return ( <Session session={session}
                speakers={this.state.speakers}
                expanded={this.state.expanded}
                speakerAquiredCallback={this.speakerAquired}
                key={session.id} />
    );
  }

  componentDidMount() {
    if (this.state.sessions === undefined) {
      this.fetchSessions();
    }
  }

  render() {
    // if (this.state.error !== undefined) {
    //   return (
    //     <h2>Error Please Try Again Later </h2>
    //   )
    // }
    if (this.state.sessions === undefined) {
      return ( <ProgressIndicator /> );
    }

    const { classes } = this.props;
    return (
      <div className = { classes.root} >
        {
          this.state.sessions.map((value, index) => {
            return this.buildSession(value);
          })
        }
      </div>
    );
  }
}

export default withStyles(styles)(SessionList);
