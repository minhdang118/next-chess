import { PieceNotation } from "../../const";
import { useAppContext } from "../../contexts/Context";
import { clearCandidateMoves, makeNewMove } from "../../reducer/actions/move";
import { closePopup } from "../../reducer/actions/popup";
import "../../styles/PromotionBox.css";
import { copyPosition, getArrayElement } from "../../utils/helper";

const PromotionBox = () => {
    const options = [PieceNotation.queen, PieceNotation.rook, PieceNotation.bishop, PieceNotation.knight];

    const {appState, dispatch} = useAppContext();
    const {position, promotionInfo, turn} = appState;

    // no promotion available
    if (!promotionInfo) {
        return null;
    }

    // a pawn can only be promoted on its color's turn
    const color = turn;

    const getPromotionBoxPosition = () => {
        const style = {};

        if (promotionInfo.rankTo === 0) {
            style.top = "0";
        } else {
            style.bottom = "0";
        }

        style.left = `${12.5 * promotionInfo.fileTo}%`;

        return style;

    }

    const handlePromotionClick = (chosenPiece) => {
        const newPosition = copyPosition(getArrayElement.last(position));
        newPosition[promotionInfo.rankFrom][promotionInfo.fileFrom] = PieceNotation.blank;
        newPosition[promotionInfo.rankTo][promotionInfo.fileTo] = color + chosenPiece;

        dispatch(closePopup())
        dispatch(clearCandidateMoves());
        dispatch(makeNewMove({newPosition}));
    }

    return (
        <div className="popup-inner promotion-choices" style={getPromotionBoxPosition()}>
            {options.map((option) => 
                <div 
                key={option}
                className={`piece ${color}${option}`}
                onClick={() => handlePromotionClick(option)}
                >
                </div>
        )}
        </div>
    );
}
 
export default PromotionBox;