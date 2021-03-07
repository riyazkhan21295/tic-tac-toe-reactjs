function Moves(props) {
    let { history, isAscToggle } = props;

    const moves = history.map((step, move) => {
        const {
            locations: { col, row },
            isStepSelected,
        } = step;

        let desc = 'Go to game start';
        move && (desc = `Go to move #${move} (${col}, ${row})`);

        return (
            <li key={move}>
                <button className={`btn ${isStepSelected ? 'selected' : ''}`.trim()} onClick={() => props.jumpTo(move)}>
                    {desc}
                </button>
            </li>
        );
    });

    !isAscToggle && moves.reverse();

    return moves;
}

export default Moves;
