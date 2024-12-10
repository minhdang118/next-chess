import { PieceNotation, ColorNotation } from "../../const";
import "../../styles/PromotionBox.css";

const PromotionBox = () => {
    const options = [PieceNotation.queen, PieceNotation.rook, PieceNotation.bishop, PieceNotation.knight];
    const color = ColorNotation.white;

    const x = 7;
    const y = 4;

    const getPromotionBoxPosition = () => {
        const style = {};

        if (x === 0) {
            style.top = "0";
        } else {
            style.bottom = "0";
        }

        style.left = `${12.5 * y}%`;

        return style;

    }
    return (
        <div className="popup-inner promotion-choices" style={getPromotionBoxPosition()}>
            {options.map((option) => 
                <div 
                key={option}
                className={`piece ${color}${option}`}
                >
                </div>
        )}
        </div>
    );
}
 
export default PromotionBox;