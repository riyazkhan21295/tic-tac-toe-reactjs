function Square(props) {
    const isNullPresent = props.winnerColumnsIndex.filter(columnIndex => !columnIndex).length > 0 ? true : false;
    const isColumnIndexPresent =
        props.winnerColumnsIndex.filter(columnIndex => columnIndex === +props.columnIndex).length > 0 ? true : false;

    return (
        <button
            className={`square ${!isNullPresent && isColumnIndexPresent && 'square--winner'}`.trim()}
            onClick={() => props.onSquareClick()}>
            {props.value}
        </button>
    );
}

export default Square;
