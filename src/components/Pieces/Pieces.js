import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getInfoFromPieceClassName, getPositionFromFen } from "../../utils/helper";
import { useState } from "react";

const Pieces = () => {
    const starting_fen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const [position, setPosition] = useState(getPositionFromFen(starting_fen));
    // console.log(position);

    const [isInMove, setIsInMove] = useState(false);

    let pieceTo, rankTo, fileTo;
    const [pieceFrom, setPieceFrom] = useState(null);
    const [rankFrom, setRankFrom] = useState(null);
    const [fileFrom, setFileFrom] = useState(null);

    const handlePieceClick = (e) => {
        // pick piece
        if (!isInMove) {
            const infoFrom = getInfoFromPieceClassName(e.target.className);
            setPieceFrom(infoFrom[0]);
            setRankFrom(infoFrom[1]);
            setFileFrom(infoFrom[2]);
            setIsInMove(true);
        } 
        // move piece
        else {
            [pieceTo, rankTo, fileTo] = getInfoFromPieceClassName(e.target.className);
            console.log("pick", pieceFrom, rankFrom, fileFrom);
            console.log("move", pieceTo, rankTo, fileTo);
            // change position
            if (pieceFrom !== pieceTo || rankFrom !== rankTo || fileFrom !== fileTo) {
                const newPosition = position.map((r, rank) => r.map((f, file) => position[rank][file]));
                newPosition[parseInt(rankTo)][parseInt(fileTo)] = pieceFrom;
                newPosition[parseInt(rankFrom)][parseInt(fileFrom)] = "-";
                setPosition(newPosition);
            }
            setIsInMove(false);
        }
    }

    return (
        <div className="pieces">
            {position.map((r, rank) => 
                r.map((f, file) => 
                    position[rank][file]
                    ?   <Piece
                            key={rank + "-" + file}
                            rank={rank}
                            file={file}
                            piece={position[rank][file]}
                            handlePieceClick={handlePieceClick}
                        />
                    :   null
                )
            )}
        </div>
    );
}
 
export default Pieces;