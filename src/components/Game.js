import React from 'react';

// COMPONENTS
import Board from './Board';

class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                    locations: {
                        col: null,
                        row: null,
                    },
                },
            ],
            xIsNext: true,
            stepNumber: 0,
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
            stepNumber: step,
            xIsNext: step % 2 === 0 ? true : false,
        });
    }

    render() {
        const { history } = this.state;
        const current = history[this.state.stepNumber];

        let status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;

        const winner = calculateWinner(current.squares);
        if (winner) {
            status = `Winner: ${winner}`;
        }

        const moves = history.map((step, move) => {
            const {
                locations: { col, row },
            } = step;

            let desc = 'Go to game start';
            move && (desc = `Go to move #${move} (${col}, ${row})`);

            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className='game'>
                <div className='game__board'>
                    <Board squares={current.squares} onSquareClick={i => this.handleSquareClick(i)} />
                </div>
                <div className='game__info'>
                    <div>{status}</div>
                    <ol>{moves}</ol>
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
        [0, 3, 4],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];

        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
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

export default Game;
