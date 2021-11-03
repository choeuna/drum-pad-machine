

const firstBank = [
  {
    title: 'Heater-1',
    letter: 'Q',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    title: 'Heater-2',
    letter: 'W',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    title: 'Heater-3',
    letter: 'E',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    title: 'Heater-4',
    letter: 'A',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    title: 'Clap',
    letter: 'S',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    title: 'Open-HH',
    letter: 'D',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    title: 'Kick-n-Hat',
    letter: 'Z',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    title: 'Kick',
    letter: 'X',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    title: 'Closed-HH',
    letter: 'C',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];
const secondBank = [
  {
    id: 'Chord-1',
    key: 'Q',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    id: 'Chord-2',
    key: 'W',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    id: 'Chord-3',
    key: 'E',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    id: 'Shaker',
    key: 'A',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  },
  {
    id: 'Open-HH',
    key: 'S',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    id: 'Closed-HH',
    key: 'D',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    id: 'Punchy-Kick',
    key: 'Z',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    id: 'Side-Stick',
    key: 'X',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    id: 'Snare',
    key: 'C',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusStyle: {color: 'blue'}
    }
    this.playSoundbite = this.playSoundbite.bind(this);
    this.lightPad = this.lightPad.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }
  
  lightPad() {
    // light up the pad
  }
  
  playSoundbite() {
    const sound = document.getElementById(this.props.letter);
    sound.currentTime = 0;
    sound.play();
    this.lightPad();
    setTimeout(() => this.lightPad(), 100);
    this.props.updateDisplay(this.props.title.replace(/-/g, ' ')); 
  }
  componentDidMount() {
    document.addEventListener('keydown', this.keyDownHandler)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.keyDownHandler)
  }
  
  keyDownHandler(event) {
    let keyCode = 'Key' + this.props.letter
    if (event.code === keyCode) {
      this.playSoundbite();
    }
  }
  
  render() {
    let classes = 'drum-pad button-row-' + this.props.row;
    return (
      <div className={classes}
           id={this.props.title}
           onClick={this.playSoundbite}
           style={this.state.statusStyle}>
          <audio
            className='soundbite'
            id={this.props.letter}
            src={this.props.audio}
          />
          {this.props.letter}
        </div>
    )
  }
}

class PadButtons extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    let padButtons;
    if (this.props.power) {
      padButtons = this.props.bank.map((obj, i, arr) => {
        return (
        <DrumPad 
          row={Math.floor(i/3)}
          title={obj.title} 
          letter={obj.letter} 
          audio={obj.audio}
          updateDisplay={this.props.updateDisplay}
         />
        )
      });
    }
    return (<div id='drum-pad-buttons'>{padButtons}</div>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      bank: firstBank,
      volume: 0.3,
      displayText: 'test'
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  
  togglePower() {
    this.setState({
      power: !this.state.power
    });
  }
  
  toggleBank() {
    let newBank = this.state.bank === firstBank ? secondBank : firstBank;
    this.setState({
      bank: newBank
    });
  }
  
  // volume change handler
  changeVolume(e) {
    this.setState({
      volume: e.target.value,
      displayText: 'volume: ' + Math.round(e.target.value*100)
    });
    setTimeout(() => this.clearDisplay(), 3000);
  }
  
  // displayText change handler
  updateDisplay(newText) {
    if (this.state.power) {
      this.setState({
        displayText: newText
      });
    }
  }
  
  clearDisplay() {
    this.setState({
      displayText: ''
    });
  }
  
  
  render() {
    // if powerToggle == false, disable lights, sounds, disallow toggle, disallow volume 
    const powerSlider = this.state.power 
        ? {float: 'right'} : {float: 'left'};
    const bankSlider = this.state.bank === firstBank 
        ? {float: 'left'} : {float: 'right'};
    return (
      <div id='drum-machine'>
        <img id='logo' src='https://static.thenounproject.com/png/17471-200.png'/>
        <PadButtons 
          power={this.state.power} 
          bank={this.state.bank}
          updateDisplay={this.updateDisplay} 
        />
        <div id='display'>
          <p id='display-text'>{this.state.displayText}</p>
          <div id='toggles'>
            <div className='control'>
              <p>Power</p>
              <div className='toggle' onClick={this.togglePower}>
                <div className='toggle-inner' style={powerSlider}/>
              </div>
            </div>
            <div className='control'>
              <p>Bank</p>
              <div className='toggle' onClick={this.toggleBank}>
                <div className='toggle-inner' style={bankSlider}/>
              </div>
            </div>
          </div>
          <div id='volume'>
            <input max='1' min='0' onChange={this.changeVolume} step='0.01' type='range' value={this.state.volume}/>
          </div>
        </div>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));