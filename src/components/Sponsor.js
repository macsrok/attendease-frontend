import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';

const styles = {
  bigAvatar: {
    margin: 10,
    maxWidth: 150,
    maxHeight: 150,
  },
};

class Sponsor extends Component {

  render() {
    const  { sponsor, classes } = this.props
    return (
      <ListItem className="sponsorListItem">
        <img alt={sponsor.name} src={sponsor.logo_url} className={classes.bigAvatar} />
        <ListItemText primary={sponsor.name} secondary={sponsor.level} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Sponsor);
