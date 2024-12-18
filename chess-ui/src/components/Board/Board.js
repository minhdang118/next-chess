import { useSelector } from "react-redux";
import { PieceNotation } from "../../const";
import "../../styles/Board.css";
import Pieces from "../Pieces/Pieces";
import Popup from "../Popup/Popup";
import FileInd from "./FileInd";
import RankInd from "./RankInd";
import { selectCandidateMoves, selectPositions } from "../../app/gameSlice";
import { getArrayElement } from "../../utils/helper";

const Board = () => {
    const ranks = Array(8).fill().map((x, i) => i + 1);
    const files = Array(8).fill().map((x, i) => i + 1);

    const positions = useSelector(selectPositions);
    const candidateMoves = useSelector(selectCandidateMoves);

    const currPosition = getArrayElement.last(positions);

    const getTileClassName = (i, j) => {
        let c = "tile";
        c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
        
        if (candidateMoves?.find((m) => m[0] === i & m[1] === j)) {
            if (currPosition[i][j] === PieceNotation.blank) {
                c += " highlight";
            } else {
                c += " attacking";
            }
        }
        return c;
    }

    return (
        <div className="board">
            <RankInd ranks={ranks.reverse()}/>

            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) => 
                        <div className={getTileClassName(i, j)} key={rank + "_" + file}></div>
                    )
                )}
            </div>

            <Pieces />

            <Popup />

            <FileInd files={files}/>
        </div>
    );
}
 
export default Board;