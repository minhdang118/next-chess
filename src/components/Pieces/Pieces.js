import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getInfoFromPieceClassName, getInitGameState } from "../../utils/helper";
import { useState } from "react";

const Pieces = () => {
    const [position, setPosition] = useState(getInitGameState.position);
    // console.log(position);

    const [isPickingPiece, setIsPickingPiece] = useState(false);

    const [pieceFrom, setPieceFrom] = useState(null);
    const [rankFrom, setRankFrom] = useState(null);
    const [fileFrom, setFileFrom] = useState(null);

    let pieceTo, rankTo, fileTo;

    function pickPiece(e) {
        const infoFrom = getInfoFromPieceClassName(e.target.className);

        // prevent picking a blank piece
        if (infoFrom.piece !== "-") {
            setPieceFrom(infoFrom.piece);
            setRankFrom(infoFrom.rank);
            setFileFrom(infoFrom.file);
            setIsPickingPiece(true);
        }
    }

    function movePieceAndChangePosition(e) {
        const infoTo = getInfoFromPieceClassName(e.target.className);
        pieceTo = infoTo.piece;
        rankTo = infoTo.rank;
        fileTo = infoTo.file;

        console.log("pick", pieceFrom, rankFrom, fileFrom);
        console.log("move", pieceTo, rankTo, fileTo);

        // change position
        if (pieceFrom !== pieceTo || rankFrom !== rankTo || fileFrom !== fileTo) {
            const newPosition = position.map((r, rank) => r.map((f, file) => position[rank][file]));
            newPosition[parseInt(rankTo)][parseInt(fileTo)] = pieceFrom;
            newPosition[parseInt(rankFrom)][parseInt(fileFrom)] = "-";
            setPosition(newPosition);
        }

        setIsPickingPiece(false);
    }

    const handlePieceClick = (e) => {
        if (!isPickingPiece) {
            pickPiece(e);
        } else {
            movePieceAndChangePosition(e);
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