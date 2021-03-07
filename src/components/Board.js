import React from 'react';

// COMPONENTS
import Square from './Square';

class Board extends React.Component {
    createBoard(columns, rows) {
        const boardRows = [];

        for (let i = 0; i < columns * rows; i++) {
            if (i % columns === 0) {
                const row = (
                    <div className='board__row' key={i}>
                        {this.createColumns(i, i + columns)}
                    </div>
                );

                boardRows.push(row);
            }
        }

        return boardRows;
    }

    createColumns(startColumnDigit, endColumnDigit) {
        const boardColumns = [];

        for (let i = startColumnDigit; i < endColumnDigit; i++) {
            boardColumns.push(this.renderSquare(i));
        }

        return boardColumns;
    }

    renderSquare(i) {
        return (
            <Square
                columnIndex={i}
                value={this.props.squares[i]}
                onSquareClick={() => this.props.onSquareClick(i)}
                winnerColumnsIndex={this.props.winnerColumnsIndex}
            />
        );
    }

    render() {
        return <div className='board'>{this.createBoard(3, 3)}</div>;
    }
}

export default Board;
