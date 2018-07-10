import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
      alignItrems: 'center',
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    size:{
        height: '10vh',
        verticalAlign: 'middle'
    },
    color:{
        backgroundColor:"#7cf1dc"
    }
};

class HeaderMenu extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <AppBar position="static" style={styles.size,styles.color}>
                    <Toolbar style={styles.flex}>
                        <Typography 
                            variant="title" 
                            color="inherit" 
                            className={classes.flex}
                            style={{textAlign:"center"}}    
                        >
                        {this.props.headerName}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

HeaderMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HeaderMenu);
  