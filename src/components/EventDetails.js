import AttendeaseAPI from "../api/AttendeaseAPI"
import ProgressIndicator from './ProgressIndicator'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import red from '@material-ui/core/colors/red';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.api = new AttendeaseAPI();
    this.parentCallback = props.onChangeCallback
    if(this.props.event){
      this.state = {
        event: this.props.event,
      };
    }else{
      this.state = {
        event: undefined,
      };
    };
  }

async fetchEvent() {
  const e = await this.api.getAttendeaseEvent();
  this.setState(prevState => ({
    event: e,
    isLoaded: true
  }));
  this.parentCallback(e);
}

componentDidMount() {
  if(this.state.event === undefined){
    this.fetchEvent();
  }
}

  render() {

    if (this.state.event === undefined) {
      return (
        <ProgressIndicator/>
      )
    }

    const { classes } = this.props;
    const { name, description, dates} = this.state.event


    return (
      <Card className={`${classes.card} EventDetails`}>
        <CardHeader
          title={name}
          subheader={`${dates[0].date_formatted} - ${dates[dates.length-1].date_formatted}`}/>
        <CardMedia
          className={classes.media}
          image={`https://via.placeholder.com/600x300.png?text=${name}`}
          title={name}
        />
        <CardContent>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(EventDetails);
