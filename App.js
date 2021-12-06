import React, {useCallback, useMemo} from "react";
import BoardTile from "./BoardTile.js";
import PlayerIndicator from "./PlayerIndicator.js";
import {addValue, reset} from "./store/actions";
import {connect} from "react-redux";
import {getBoard, getCurrentValue} from "./selectors";
import './styles.scss';

function App({currentValue, addValue, reset, board}) {
    const handleTileClick = useCallback((index) => {
        if (board[index]) {
            return;
        }

        addValue(index)
    }, [addValue, board]);

    const winner = useMemo(() => {
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
                return board[a];
            }
        }

        return null;
    }, [board]);

    const isDraw = useMemo(() => !winner && !board.includes(''), [winner, board]);
    const isEnded = useMemo(() => isDraw || winner, [winner, isDraw]);

    return (
        <div className="App">
            {!isEnded && (
                <PlayerIndicator className="player_indicator">
                    Player {currentValue} it is your turn.
                </PlayerIndicator>
            )}

            <div className="board">
                {board.map((item, index) => (
                        <BoardTile
                            key={index}
                            index={index}
                            className='board_tile'
                            onClick={handleTileClick}
                        >
                            {item}
                        </BoardTile>
                    )
                )}
            </div>

            {winner && (
                <p className='announce-winner'>
                    Player {winner} is won!
                </p>
            )}

            {isDraw && (
                <p className='announce-draw'>
                    It's draw in this game
                </p>
            )}

            {isEnded && (
                <div className='button_wrapper'>
                    <button className='reset_btn' onClick={reset}>Play Again</button>
                </div>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    currentValue: getCurrentValue(state),
    board: getBoard(state)
})

const mapDispatchToProps = {
    addValue,
    reset
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



