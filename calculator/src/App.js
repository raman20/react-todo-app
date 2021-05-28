import './App.css';
import React from 'react';

class Button extends React.Component {
  render() {
    const val = this.props.val;
    return (
      <button onClick={(_e) => { this.props.input(val) }}>{val}</button>
    );
  }
}

class SpecialButton extends React.Component {
  render() {
    const val = this.props.val;
    let inpVal;
    if (val === 'C') {
      inpVal = "";
    }
    else {
      console.log(this.props.dispVal)
      inpVal = eval(this.props.dispVal);
    }
    return (
      <button onClick={(_e) => { this.props.updateDisp(inpVal) }}>{val}</button>
    )
  }

}


class ButtonSpace extends React.Component {
  render() {
    let input = this.props.input;
    let updateDisp = this.props.updateDisp;
    let dispVal = this.props.val;
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td><Button val={1} input={input} /></td>
            <td><Button val={2} input={input} /></td>
            <td><Button val={3} input={input} /></td>
            <td><Button val={'+'} input={input} /></td>
          </tr>
          <tr>
            <td><Button val={4} input={input} /></td>
            <td><Button val={5} input={input} /></td>
            <td><Button val={6} input={input} /></td>
            <td><Button val={'-'} input={input} /></td>
          </tr>
          <tr>
            <td><Button val={7} input={input} /></td>
            <td><Button val={8} input={input} /></td>
            <td><Button val={9} input={input} /></td>
            <td><Button val={'*'} input={input} /></td>
          </tr>
          <tr>
            <td><Button val={0} input={input} /></td>
            <td><SpecialButton val={'C'} updateDisp={updateDisp} dispVal={dispVal} /></td>
            <td><SpecialButton val={'='} updateDisp={updateDisp} dispVal={dispVal} /></td>
            <td><Button val={'/'} input={input} /></td>
          </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
    );
  }
}

class Screen extends React.Component {
  render() {
    return (
      <input type="text" value={this.props.val} disabled />
    );
  }
}

class Calculator extends React.Component {

  constructor(props) {
    super(props);
    this.state = { dispVal: "" };
  }

  updateDisp = (val) => {
    this.setState((prevState, currProps) => ({
      dispVal: val
    }));
  }

  input = (val) => {
    this.setState((prevState, currProps) => ({
      dispVal: prevState.dispVal + val
    }));
  }

  render() {
    return (
      <div className="parent">
        <h2>React Calc. App</h2><br />
        <Screen val={this.state.dispVal} />
        <ButtonSpace input={this.input} updateDisp={this.updateDisp} val={this.state.dispVal} />
      </div>
    );
  }

}

export default Calculator;
