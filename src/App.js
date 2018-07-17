import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import numParse from './numParse';
import removeVat from './removeVat';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      int: "0",
      deci: "00",
      point: false,
      vat: "remove",
      rate: 20
    };
    this.handleKey = this.handleKey.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleVatClick = this.handleVatClick.bind(this);
    this.handleVatChange = this.handleVatChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.inputRef = React.createRef();
  }

  handleRemoveClick() {
    this.setState({ vat: "remove" });
  }

  handleAddClick() {
    this.setState({ vat: "add" });
  }

  handleVatClick() {
    this.setState({ point: false });
  }

  handleVatChange(e) {
    this.setState({ rate: e.target.value });
  }

  handleKey(e) {
    let reg = RegExp(/\d/);
    const point = this.state.point;
    const input = e.key;
    if (reg.test(input) && !point) {
      this.setState(prevState => {
        return { int: prevState.int + input };
      });
    } else if (input == ".") {
      this.setState({ point: true });
    } else if (reg.test(input) && point) {
      this.setState(prevState => {
        return { deci: prevState.deci + input };
      });
    } else if (input == "Delete" || input == "Backspace") {
      this.setState({
        int: "0",
        deci: "00",
        point: false
      });
    }
  };
  
  handleClear(){
    this.setState({int: "0", deci: "00"})
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    const int = this.state.int,
          deci = this.state.deci,
          input = numParse(int, deci),
          btn1Colors = ["#0069d9", "#2391ff"],
          btnRed = ["#bf0000", "#ff0000"],
          remove = this.state.vat == "remove" ? true : false,
          add = this.state.vat == "add" ? true : false,
          output = remove ? removeVat(input, this.state.rate) : input;
    return (
      <main>
        <div className="wrapper">
          <h1 className="title">Vat Calculator</h1>
          <div style={{ margin: "1em 0" }}>
            <p className="inline">VAT rate</p>
            <input
              className="vat right"
              type="number"
              placeholder={this.state.rate}
              onChange={this.handleVatChange}
              onClick={this.handleVatClick}
              />
          </div>
          <p>Amount</p>
          <div
            ref={this.inputRef}
            tabIndex="0"
            onKeyDown={this.handleKey}
            className="form"
            >
            <span>£</span>
            <div className="input">
              <p>{input}</p>
            </div>
          </div>
          <div className="btnBar">
            <Button
              active={remove}
              colors={btn1Colors}
              click={this.handleRemoveClick}
              >
              Remove Vat
            </Button>
            <Button
              active={add}
              colors={btn1Colors}
              click={this.handleAddClick}
              >
              Add Vat
            </Button>
            <Button active={false} colors={btnRed} tab={2} click={this.handleClear}>Clear</Button>
          </div>
          <div className="result">
            <p>Net Amount</p>
            <span> (excluding VAT)</span>
            <p> :</p>
            <p className="right">{"£ " + output}</p> <br />
            <p>VAT</p>
            <span> ({this.state.rate}%)</span>
            <p> :</p>
            <p className="right">
              {"£ " + (output * this.state.rate / 100).toFixed(2).toString()}
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
