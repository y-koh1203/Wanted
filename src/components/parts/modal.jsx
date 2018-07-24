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
    width                 : '90vw',
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
  headText: { 
    color: '#000000',
    fontWeight: 100,
  },

  buttonWrap:{
    width: '20vw',
    height: 'auto',
  },

  centering: { 
    textAlign: 'center',
  },

  buttonIcons:{
    width: '100%',
    height: 'auto',
    maxWidth: '100px'
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

  onClickLogout(){
    localStorage.setItem('jwt',null);
    this.props.history.push('/');
  }

  // onClickPostQuestion(){
  //   this.props.history.push('question/post');
  // }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#0000000';
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
          ariaHideApp={false}
        >

          <h2 
            ref={subtitle => this.subtitle = subtitle}
            style={Object.assign({},...[styles.centering,styles.headText])}
          >
            メニュー
          </h2>
          <div style={styles.flex}>
            <div style={Object.assign({},...[styles.buttonWrap,styles.centering])}>
              <Button 
                  variant="outlined"
                  onClick={this.closeModal}
              >
                <Link to="/"><Home style={Object.assign({},...[styles.buttonIcons])}/></Link>
              </Button>
              <p style={Object.assign({},...[styles.centering])}>ホーム</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap,styles.centering])}>
              <Button 
                  variant="outlined"
                  onClick={this.closeModal}
                  color="primary"
              >
                <Link to="/user"><PersonIcon style={Object.assign({},...[styles.buttonIcons])} /></Link>
              </Button>
              <p style={Object.assign({},...[styles.centering])}>プロフィール</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap,styles.centering])}>
              <Button 
                  variant="outlined"
                  onClick={this.closeModal}
                  color="primary"
              >
                <Link to="/question/post"><QuestionAnswer style={Object.assign({},...[styles.buttonIcons])} /></Link>
              </Button>
              <p style={Object.assign({},...[styles.centering])}>質問</p>
            </div>

            <div style={Object.assign({},...[styles.buttonWrap,styles.centering])}>
              <Button 
                  variant="outlined"
                  //onClick={this.closeModal}
                  onClick={this.onClickLogout}
              >
                  {/* <Link to="/"> */}<ExitToApp style={Object.assign({},...[styles.buttonIcons])} />{/* </Link> */}
              </Button>
              <p style={Object.assign({},...[styles.centering])}>ログアウト</p>
            </div>

          </div>
          <div　style={Object.assign({},...[styles.centering])}>
            <Button 
                variant="outlined"
                onClick={this.closeModal}
            >
                閉じる
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withRouter(withStyles(customStyles)(ModalWindow));