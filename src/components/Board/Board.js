import "../../styles/Board.css";
import { getTileClassName } from "../../utils/helper";
import Pieces from "../Pieces/Pieces";
import FileInd from "./FileInd";
import RankInd from "./RankInd";

const Board = () => {
    const ranks = Array(8).fill().map((x, i) => i + 1);
    const files = Array(8).fill().map((x, i) => i + 1);
    return (
        <div className="board">
            <RankInd ranks={ranks.reverse()}/>

            <div className="tiles">
                {ranks.map((rank, i) =>
                    files.map((file, j) => 
                        <div className={getTileClassName(i, j)} key={rank + "-" + file}></div>
                    )
                )}
            </div>

            <Pieces/>

            <FileInd files={files}/>
        </div>
    );
}
 
export default Board;