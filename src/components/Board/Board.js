import { useAppContext } from "../../contexts/Context";
import "../../styles/Board.css";
import { getLastElementOfArr } from "../../utils/helper";
import Pieces from "../Pieces/Pieces";
import FileInd from "./FileInd";
import RankInd from "./RankInd";

const Board = () => {
    const ranks = Array(8).fill().map((x, i) => i + 1);
    const files = Array(8).fill().map((x, i) => i + 1);

    const {appState} = useAppContext();
    const position = getLastElementOfArr(appState.position);

    const getTileClassName = (i, j) => {
        let c = "tile";
        c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
        
        if (appState.candidateMoves?.find((m) => m[0] === i & m[1] === j)) {
            if (position[i][j] === "-") {
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