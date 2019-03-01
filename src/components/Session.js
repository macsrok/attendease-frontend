import AttendeaseAPI from "../api/AttendeaseAPI"
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { Component } from 'react';

const styles = {
  details: {
    textAlign: 'left',
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
}


class Session extends Component {
  constructor(props) {
    super(props);
    this.api = new AttendeaseAPI();
    this.speakerAquiredCallback = this.props.speakerAquiredCallback;
    this.state = {
      session: this.props.session,
      speakers: this.props.speakers,
      error: undefined,
    };
  }

  renderDateTimes(session) {
    const { instances } = session;
    if (instances.length > 0) {
      return (
        instances.map((value, index) => {
          return (
            <Typography key={`TDAT-${value.id}-TDAT`}>
              {value.date_formatted} {value.time_formatted}
            </Typography>
          )
        })
      );
    }

    return (
      <Typography key={`TDAT-${session.id}-TDAT`}>
        TBD
      </Typography>
    )
  }

  renderSpeaker(value) {
    const { speakers } = this.state
    return (
      <Typography key={`SPEAK-${value}-SPEAK`}>
        {speakers[value].first_name} {speakers[value].last_name}
      </Typography>
    );
  }

  render() {
    const  { classes } = this.props;
    const  { session } = this.state;
    return (
      <ExpansionPanel key={`EP-${session.id}-EP`}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>{session.name}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.column}>
            <Typography>
              {session.description}
            </Typography>
          </div>
          <div className={classes.column}>
            { this.renderDateTimes(session) }
          </div>
          <div className={classes.column}>
          {
              session.speaker_ids.map((value, index) => {
                return (
                  this.renderSpeaker(value)
                )
              })
          }
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

export default withStyles(styles)(Session);
