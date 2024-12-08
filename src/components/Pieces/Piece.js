import { useAppContext } from "../../contexts/Context";
import { getFirstElementOfArr } from "../../utils/helper";

const Piece = ({rank, file, piece, handlePieceClick}) => {
    const {appState} = useAppContext();
    const myColor = getFirstElementOfArr(piece)

    return (
        piece === "-"
        ? 
        <div 
        className={`piece ${piece} p-${rank}${file}`}
        onClick={handlePieceClick}
        >
        </div>
        :
        <div 
        className={`piece ${piece} p-${rank}${file}`}
        onClick={appState.turn === myColor ? handlePieceClick : null}
        >
        </div>
    );
}
 
export default Piece;