import React from 'react';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PersonIcon from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : 'auto',
    right                 : 'auto',
    bottom                : 'auto',
    width                 : '80vw',
    marginLeft            : '50%',
    transform             : 'translate(-50%, -50%)',
    zIndex                : '100',
  },
  overlay : {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
};

const menuButtonStyles = {
  top: '80%',
  left: '80%',
  position: 'fixed'
}

const styles = {
  buttonWrap:{
    width: '20%',
  },

  buttonIcons:{
    width: '80%',
    height: 'auto'
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}


class ModalWindow extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  onClickLogout(){}

  // onClickPostQuestion(){
  //   this.props.history.push('question/post');
  // }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>
        <Button 
          variant="fab" 
          color="primary" 
          aria-label="add" 
          onClick={this.openModal} 
          style={menuButtonStyles}
        >
          <Menu />
        </Button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>メニュー</h2>
          <button onClick={this.closeModal}>close</button>
          <div style={styles.flex}>
            <div style={Object.assign({},...[styles.buttonWrap])}>
              <button>
                <Link to="/"><Home style={Object.assign({},...[styles.buttonIcons])}/></Link>
              </button>
              <p>ホーム</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap])}>
              <button>
                <Link to="/"><PersonIcon style={Object.assign({},...[styles.buttonIcons])} /></Link>
              </button>
              <p>プロフィール</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap])}>
              <button>
                <Link to="/question/post"><QuestionAnswer style={Object.assign({},...[styles.buttonIcons])} /></Link>
              </button>
              <p>質問</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap])}>
              <button>
                <Link to="/"><ExitToApp style={Object.assign({},...[styles.buttonIcons])} /></Link>
              </button>    
              <p>ログアウト</p>
            </div>
          
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(ModalWindow));