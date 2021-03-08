import React from 'react';

// COMPONENTS
import Board from './Board';
import Moves from './Moves';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.initialState = {
            history: [
                {
                    squares: Array(9).fill(null),
                    locations: {
                        col: null,
                        row: null,
                    },
                    isStepSelected: false,
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            isAscToggle: true,
        };

        this.state = {
            ...this.initialState,
        };
    }

    handleSquareClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];

        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) return;

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.setState({
            history: [
                ...history,
                {
                    squares: squares,
                    locations: calculateLocation(i),
                },
            ],
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            history: this.updateIsStepSelected(step),
            stepNumber: step,
            xIsNext: step % 2 === 0 ? true : false,
        });
    }

    updateIsStepSelected(step) {
        return this.state.history.map((obj, index) => {
            return {
                ...obj,
                isStepSelected: index === +step ? true : false,
            };
        });
    }

    toggleMoves() {
        this.setState({
            isAscToggle: !this.state.isAscToggle,
        });
    }

    resetGame() {
        this.setState({
            ...this.initialState,
        });
    }

    render() {
        const { history } = this.state;
        const current = history[this.state.stepNumber];

        let status = <span>Next player: {this.state.xIsNext ? 'X' : 'O'}</span>;

        let winnerColumnsIndex = [null, null, null];
        const winner = calculateWinner(current.squares);
        if (winner) {
            const { name, columnsIndex } = winner;

            winnerColumnsIndex = columnsIndex;
            status = <span style={{ fontWeight: 700 }}>Winner: {name}</span>;
        }

        const isDraw = checkIsGameDraw(history[history.length - 1].squares);
        if (isDraw) {
            status = (
                <>
                    <span>Game Draw</span>
                    <br />
                    <button onClick={() => this.resetGame()} style={{ marginBottom: '1rem' }}>
                        Play Again
                    </button>
                </>
            );
        }

        return (
            <div className='game'>
                <div className='game__board'>
                    <Board
                        squares={current.squares}
                        onSquareClick={i => this.handleSquareClick(i)}
                        winnerColumnsIndex={winnerColumnsIndex}
                    />
                </div>
                <div className='game__info'>
                    <div>{status}</div>
                    {history.length > 1 && <button onClick={() => this.toggleMoves()}>Toggle</button>}
                    <ol>
                        <Moves
                            history={history}
                            jumpTo={move => this.jumpTo(move)}
                            isAscToggle={this.state.isAscToggle}
                        />
                    </ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    if (!squares) return;

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

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return {
                name: squares[a],
                columnsIndex: [a, b, c],
            };
        }
    }

    return null;
}

function calculateLocation(index) {
    const TOTAL_COLUMNS = 3;

    const col = Math.floor(index % TOTAL_COLUMNS) + 1;
    const row = Math.floor(index / TOTAL_COLUMNS) + 1;

    return { col, row };
}

function checkIsGameDraw(squares) {
    if (!squares) return false;

    const winner = calculateWinner(squares);
    const isNullPresent = squares.filter(square => !square).length > 0 ? true : false;

    return !winner && !isNullPresent ? true : false;
}

export default Game;
