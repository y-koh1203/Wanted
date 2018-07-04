import React from 'react';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import PersonIcon from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import ExitToApp from '@material-ui/icons/ExitToApp';
import { Link } from 'react-router-dom';


const customStyles = {
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-20%',
    transform             : 'translate(-50%, -50%)'
  },
  overlay : {
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
};


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
        <button onClick={this.openModal}>Open Modal</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <div>
            <button>
              <Link to="/"><Home /></Link>
            </button>
            
            <button>
              <Link to="/"><PersonIcon /></Link>
            </button>

            <button>
              <Link to="/question"><QuestionAnswer /></Link>
            </button>
            
            <button>
              <Link to="/"><ExitToApp /></Link>
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withStyles(customStyles)(ModalWindow);