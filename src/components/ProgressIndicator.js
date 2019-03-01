import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class ProgressIndicator extends Component {

  render() {
    const { classes} = this.props;
    return (
      <div>
        < CircularProgress className = { classes.progress }/>
        <h3> Please wait while we fetch the data.... </h3>
      </div>
    );
  }
}

ProgressIndicator.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(ProgressIndicator);
