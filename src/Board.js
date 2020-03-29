import React, { Component } from 'react';

/**
 * Simple component to render a square in board
 *
 * @param {*} props 
 */
const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    )
}

/**
 * Game's Board
 */
class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            countdown: 3000
        }
    }

    /**
     * Render squares in game board
     */
    renderSquare = (i) => {
        return <Square
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
        />
    }

    /**
     * Handle click on square to draw X or O in board
     */
    handleClick = (i) => {
        const squares = this.state.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    /**
     * Check for winner
     */
    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }

        return null;
    }

    /**
     * Reset the game
     */
    reset = (countdown) => {
        if (countdown) {
            setTimeout(() => {
                this.resetState();
            }, this.state.countdown);    
        } else {
            this.resetState();
        }
    }

    resetState = () => {
        const squares = Array(9).fill(null);
        this.setState({
            squares: squares,
            xIsNext: true
        });
    }

    /**
     * Render game's board
     */
    render() {
        const winner = this.calculateWinner(this.state.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner + '. Game will re-start in ' + (this.state.countdown / 1000) + ' second(s).';
            this.reset(true);
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="reset"><button onClick={() => this.reset()}>Reset</button></div>
            </div> 
        )
    }
}

export default Board;
