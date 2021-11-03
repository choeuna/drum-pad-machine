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
    title: 'Chord-1',
    letter: 'Q',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    title: 'Chord-2',
    letter: 'W',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    title: 'Chord-3',
    letter: 'E',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    title: 'Shaker',
    letter: 'A',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  },
  {
    title: 'Open-HH',
    letter: 'S',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  },
  {
    title: 'Closed-HH',
    letter: 'D',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  },
  {
    title: 'Punchy-Kick',
    letter: 'Z',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  },
  {
    title: 'Side-Stick',
    letter: 'X',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  },
  {
    title: 'Snare',
    letter: 'C',
    audio: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

//, color: 'rgba(255,255,0,0.1)', textShadow: '1px 1px 2px white, -1px -1px 15px white, 1px -1px 15px white, -1px 1px 15px white'

const depressedStyle = {
  backgroundColor: 'rgb(95,182,199)',
  boxShadow: 'inset 3px 3px 2px #444',
  marginTop: 5
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {marginTop: 0}
    };
    this.playSoundbite = this.playSoundbite.bind(this);
    this.depressPad = this.depressPad.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
  }
  
  depressPad() {
    if (this.state.style.marginTop == 0) {
      this.setState({
        style: depressedStyle
      });
    } else {
      this.setState({style: {marginTop: 0}});
    }
  }
  
  playSoundbite() {
    if (this.props.power) {
      const sound = document.getElementById(this.props.letter);
      sound.currentTime = 0;
      sound.volume = this.props.volume;
      sound.play();
    }
    this.depressPad();
    setTimeout(() => this.depressPad(), 100);
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
    return (
      <div className='drum-pad'
           id={this.props.title}
           onClick={this.playSoundbite}
           style={this.state.style}
        >
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
          power={this.props.power}
          volume={this.props.volume}
          title={obj.title} 
          letter={obj.letter} 
          audio={obj.audio}
          updateDisplay={this.props.updateDisplay}
         />
        )
      });
    } else {
      padButtons = this.props.bank.map((obj, i, arr) => {
        return (
        <DrumPad 
          volume={obj.volume}
          title={obj.title} 
          letter={obj.letter} 
          audio='#'
          updateDisplay={this.props.updateDisplay}
         />
        )
      });
    }
    return (
      <div id='drum-pad-buttons'>
        <div class='button-row-0'>
          {padButtons.slice(0,3)}
        </div>
        <div class='button-row-1'>
          {padButtons.slice(3,6)}
        </div>
        <div class='button-row-2'>
          {padButtons.slice(6,9)}
        </div>
      </div>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      bank: firstBank,
      volume: 0.3,
      displayText: 'Hi!'
    };
    this.togglePower = this.togglePower.bind(this);
    this.toggleBank = this.toggleBank.bind(this);
    this.changeVolume = this.changeVolume.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  
  togglePower() {
    this.setState({
      power: !this.state.power,
      displayText: ''
    });
  }
  
  toggleBank() {
    if (this.state.power) {
      let newBank;
      let newText;
      if (this.state.bank === firstBank) {
        newBank = secondBank;
        newText = 'Piano Kit';
      } else {
        newBank = firstBank;
        newText = 'Heater Kit'
      }
      this.setState({
        bank: newBank,
        displayText: newText
      });
    }
  }
  
  // volume change handler
  changeVolume(e) {
    if (this.state.power) {
      this.setState({
        volume: e.target.value,
        displayText: 'Volume: ' + Math.round(e.target.value*100)
      });
      setTimeout(() => this.clearDisplay(), 3000);
    }
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
    const powerSlider = this.state.power 
        ? {float: 'right'} : {float: 'left'};
    const bankSlider = this.state.bank === firstBank 
        ? {float: 'left'} : {float: 'right'};
    return (
      <div id='drum-machine'>
        <span id='logo'>Muse <i class="fas fa-compact-disc"></i></span>
        <PadButtons 
          volume={this.state.volume}
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