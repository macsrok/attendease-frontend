import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class CenteredTabs extends React.Component {
  constructor(props) {
    super(props);
    this.parentCallback = props.onChangeCallback
    this.state = {
      tabValue: 0
    }
  }

  handleChange = (event, value) => {
    this.setState(prevState => ({
      tabValue: value
    }));
    this.parentCallback(value);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.tabValue}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Event Details"  className='centeredTab'/>
          <Tab label="Event Schedule" className='centeredTab'/>
          <Tab label="Event Sponsors" className='centeredTab'/>
        </Tabs>
      </Paper>
    );
  }
}

CenteredTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CenteredTabs);
