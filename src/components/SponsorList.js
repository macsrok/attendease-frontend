import AttendeaseAPI from "../api/AttendeaseAPI"
import ProgressIndicator from './ProgressIndicator'
import Sponsor from "./Sponsor"
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

const styles = {

}

class SponsorsList extends Component {

  constructor(props) {
    super(props);
    this.api = new AttendeaseAPI();
    this.parentCallback = props.onChangeCallback;
    this.state = {
      sponsors: this.props.sponsors,
      error: undefined,
    };
  }

  async fetchSponsors() {
    const s = await this.api.getAttendeaseEventSponsors();
    if (s.error) {
      this.setState(prevState => ({
        error: s.error,
      }));
    }else{
      this.setState(prevState => ({
        sponsors: s,
      }));
    }
    this.parentCallback(s);
  }

  buildSponsor(s) {
    return <Sponsor sponsor={s} key={s.id} />;
  }

  componentDidMount() {
    if (this.state.sponsors === undefined) {
      this.fetchSponsors();
    }
  }

  render() {
    if (this.state.error !== undefined) {
      return (
        <h2>Error Please Try Again Later </h2>
      )
    }
    if (this.state.sponsors === undefined) {
      return (
        <ProgressIndicator/>
      )
    }

    const { classes } = this.props;
    return (
      <Card className={`${classes.card} SponsorList`}>
        <CardHeader
          title="Sponsors" />
        <CardContent>
        <List component="nav"
              className={classes.root} >
           {this.state.sponsors.map((value, index) => {
             return this.buildSponsor(value);
           })}
         </List>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(SponsorsList);
