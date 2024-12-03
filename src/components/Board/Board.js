import "../../styles/Board.css";
import { getTileClassName } from "../../utils/helper";
import Pieces from "../Pieces/Pieces";
import FileInd from "./FileInd";
import RankInd from "./RankInd";

const Board = () => {
    const ranks = Array(8).fill().map((x, i) => 8 - i);
    const files = Array(8).fill().map((x, i) => i + 1);
    return (
        <div className="board">
            <RankInd ranks={ranks}/>

            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) => 
                        <div className={getTileClassName(9 - i, j)} key={file + "-" + rank}></div>
                    )
                )}
            </div>

            <Pieces/>

            <FileInd files={files}/>
        </div>
    );
}
 
export default Board;