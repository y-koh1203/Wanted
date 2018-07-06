import React, { Component } from 'react';
import HeaderMenu from '../header/HeaderComponet';
import PropTypes from 'prop-types';
import ModalWindow from '../parts/modal'
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

const styles = {
    main : {
        borderRadius:'40px',
        backgroundColor:'green',
        width: '87%',
        minHeight: '100vh',
        margin: '18% auto 0 auto',
        position: 'relative',
        zIndex: '0',
        paddingTop: 'calc((85vw / 100vh) * 100)'
    },

    icon_circle : {
        borderRadius: '50%',
        width: '34%',
        height: '29vw',
        backgroundColor: 'blue',
        position: 'absolute',
        top: '-10%',
        left: '32.5%',
        zIndex: '0',
        paddingTop: 'calc((35% / 22.5%) * 100)'
    },

    bigAvatar: {
        width: '12vw',
        height: 'auto',
        margin: '25% auto 0 auto',
        display: 'flex',
        alignItems: 'center'
    },

    root: {
        flexGrow: 1,
    },

    nameBox: {
        paddingTop: '20%',
    },

    tabBox : {
        marginTop: '10%'
    }
}

function TabContainer(props) {
    return (
      <Typography component="div" style={{ padding: 8 * 3 }}>
        {props.children}
      </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

export default class UserProfile extends Component {

    state = {
        value: 0,
    };
    
    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        //const { classes } = this.props;
        const { value } = this.state;
        return (
            <div className="wrap">
                <HeaderMenu />
             
                <div className="main">
                    <div id="user_profile_area" style={styles.main}>
                        <div id="icon_circle" className="iconCircle" style={styles.icon_circle}>
                            <Avatar
                                alt="Adelle Charles"
                                src="/assets/images/student.png"
                                style={styles.bigAvatar}
                            />
                        </div>

                        <div style={Object.assign({},...[styles.nameBox])}>
                            <h1>name</h1>
                        </div>

                        <div style={Object.assign({},...[styles.tabBox])}>
                            <Paper className="root">
                                <Tabs
                                value={this.state.value}
                                onChange={this.handleChange}
                                indicatorColor="primary"
                                textColor="primary"
                                centered
                                >
                                    <Tab label="おしえた" style={{padding:"0 8%"}} />
                                    <Tab label="きいた" style={{margin:"0 8%"}}/>
                                </Tabs>
                            </Paper>
                            {value === 0 && <TabContainer>Item One</TabContainer>}
                            {value === 1 && <TabContainer>Item Two</TabContainer>}
                            {value === 2 && <TabContainer>Item Three</TabContainer>}

                        </div>
                    </div>
                </div>
                <ModalWindow />
            </div>
        );
    }
}