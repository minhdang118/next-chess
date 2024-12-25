import { useDispatch, useSelector } from "react-redux";
import { PieceNotation } from "../../../const";
import "../../../styles/PromotionBox.css";
import { copyPosition, getArrayElement } from "../../../utils/helper";
import { clearCandidateMoves, closePopup, makeNewMove, selectPositions, selectPromotionInfo, selectTurn } from "../../../app/gameSlice";

const PromotionBox = () => {
    const promotionOptions = [PieceNotation.queen, PieceNotation.rook, PieceNotation.bishop, PieceNotation.knight];

    const positions = useSelector(selectPositions);
    const turn = useSelector(selectTurn);
    const promotionInfo = useSelector(selectPromotionInfo);

    const currPosition = getArrayElement.last(positions);

    const dispatch = useDispatch();

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
        const newPosition = copyPosition(currPosition);
        newPosition[promotionInfo.rankFrom][promotionInfo.fileFrom] = PieceNotation.blank;
        newPosition[promotionInfo.rankTo][promotionInfo.fileTo] = color + chosenPiece;

        dispatch(closePopup())
        dispatch(clearCandidateMoves());
        dispatch(makeNewMove({newPosition}));
    }

    return (
        <div className="popup-inner promotion-choices" style={getPromotionBoxPosition()}>
            {promotionOptions.map((option) => 
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