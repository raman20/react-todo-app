import './App.css';
import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {
          (obj) => {
            return <button onClick={(_e) => { obj.input(this.props.val) }}>{this.props.val}</button>
          }
        }
      </Context.Consumer>
    );
  }
}

class SpecialButton extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {
          (obj) => {
            let inpVal;
            if (this.props.val === 'C') {
              inpVal = "";
            }
            else {
              try {
                // eslint-disable-next-line no-eval
                inpVal = eval(obj.dispVal);
              }
              catch (e) {
                inpVal = 'error'
              }
            }
            return (<button onClick={(_e) => { obj.updateDisp(inpVal) }}>{this.props.val}</button>)
          }}
      </Context.Consumer>
    )
  }

}


class ButtonSpace extends React.Component {
  render() {
    return (
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td><Button val={'1'} /></td>
            <td><Button val={'2'} /></td>
            <td><Button val={'3'} /></td>
            <td><Button val={'+'} /></td>
          </tr>
          <tr>
            <td><Button val={'4'} /></td>
            <td><Button val={'5'} /></td>
            <td><Button val={'6'} /></td>
            <td><Button val={'-'} /></td>
          </tr>
          <tr>
            <td><Button val={'7'} /></td>
            <td><Button val={'8'} /></td>
            <td><Button val={'9'} /></td>
            <td><Button val={'*'} /></td>
          </tr>
          <tr>
            <td><Button val={0} /></td>
            <td><SpecialButton val={'C'} /></td>
            <td><SpecialButton val={'='} /></td>
            <td><Button val={'/'} /></td>
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

const Context = React.createContext();

class App extends React.Component {

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
    if (this.state.dispVal === 'error') {
      this.setState((prevState, currProps) => ({
        dispVal: ""
      }));
    }

    this.setState((prevState, currProps) => ({
      dispVal: prevState.dispVal + val
    }));
  }


  render() {
    return (
      <div className="parent">

        <h2>React Calc. App</h2><br />

        <Screen val={this.state.dispVal} />

        <Context.Provider value={{ input: this.input, updateDisp: this.updateDisp, dispVal: this.state.dispVal }}>

          <ButtonSpace />

        </Context.Provider>

      </div>
    );
  }

}

export default App;
