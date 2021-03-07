function Moves(props) {
    return (
        <>
            {props.history.map((step, move) => {
                const {
                    locations: { col, row },
                    isStepSelected,
                } = step;

                let desc = 'Go to game start';
                move && (desc = `Go to move #${move} (${col}, ${row})`);

                return (
                    <li key={move}>
                        <button
                            className={`btn ${isStepSelected ? 'selected' : ''}`.trim()}
                            onClick={() => props.jumpTo(move)}>
                            {desc}
                        </button>
                    </li>
                );
            })}
        </>
    );
}

export default Moves;
