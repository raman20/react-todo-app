import React from 'react';
import './App.css';

const Context = React.createContext();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.board = new Array(9);
        this.state = { winner: null, next: 'O', board: this.board };
        this.setNext = this.setNext.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.reset = this.reset.bind(this);
    }

    setNext() {
        this.setState((prevState, prevProps) => {
            return { next: (prevState.next === 'X') ? 'O' : 'X' }
        });
    }

    calculateWinner(board) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];

            if (board[a] && board[a] === board[b] && board[a] === board[c]) {

                // filling empty spaces
                for (let j = 0; j < board.length; j++) {
                    if (board[j] === undefined) {
                        board[j] = '~';
                    }
                }

                return board[a];
            }
        }
        return null;
    }

    updateBoard(squarePos, player) {
        let winner;
        if (this.board[squarePos] === undefined) {
            this.board[squarePos] = player;
            winner = this.calculateWinner(this.board);
            this.setState({ board: this.board, winner: winner });
            this.setNext();
        }

        else {
            alert('Invalid move!!');
        }

    }

    reset() {
        this.board = new Array(9);
        this.setState({ winner: null, next: 'O', board: this.board });
    }

    render() {
        return (
            <div className="App">
                <h1> The <u>TIC TAC TOE</u> Game</h1>
                <Context.Provider value={{ next: this.state.next, winner: this.state.winner, updateBoard: this.updateBoard, board: this.state.board }}>
                    <Board />
                    <PlayerIndicator player={this.state.next} />
                    <Winner winner={this.state.winner} />
                </Context.Provider>
                <Reset reset={this.reset} />
            </div>
        );
    }
}

function PlayerIndicator(props) {
    return (
        <Context.Consumer>
            {
                (value) => {
                    return (
                        <h3>Next Player -&gt; {value.next}</h3>
                    );
                }
            }
        </Context.Consumer>
    )
}

function Winner(props) {
    return (
        <Context.Consumer>
            {
                (value) => {
                    if (value.winner) {
                        return <h3> Winner -&gt; {value.winner}</h3>
                    }
                    return false;
                }}
        </Context.Consumer>
    )
}

function Reset(props) {
    return <button onClick={() => { props.reset() }}>Reset Game!</button>
}

class Board extends React.Component {
    render() {
        return (
            <div className="board">
                <div className="board-row">
                    <Square pos={0} />
                    <Square pos={1} />
                    <Square pos={2} />
                </div>
                <div className="board-row">
                    <Square pos={3} />
                    <Square pos={4} />
                    <Square pos={5} />
                </div>
                <div className="board-row">
                    <Square pos={6} />
                    <Square pos={7} />
                    <Square pos={8} />
                </div>
            </div>
        );
    }
}

class Square extends React.Component {
    render() {
        let pos = this.props.pos;

        return (
            <Context.Consumer>
                {
                    (value) => {
                        return (
                            <button className="square" onClick={() => { value.updateBoard(pos, value.next); }}>
                                {value.board[pos]}
                            </button>
                        )
                    }
                }
            </Context.Consumer>
        )
    }
}

export default App;
