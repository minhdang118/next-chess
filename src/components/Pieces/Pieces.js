import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getInfoFromPieceClassName } from "../../utils/helper";
import { useState } from "react";
import { useAppContext } from "../../contexts/Context";
import { makeNewMove } from "../../reducer/actions/move";

const Pieces = () => {
    const {appState, dispatch} = useAppContext();
    const currentPosition = appState.position[appState.position.length - 1];

    // const [currentPosition, setcurrentPosition] = useState(getInitGameState.currentPosition);
    // console.log(currentPosition);

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

        // change currentPosition
        if (pieceFrom !== pieceTo || rankFrom !== rankTo || fileFrom !== fileTo) {
            const newPosition = currentPosition.map((r, rank) => r.map((f, file) => currentPosition[rank][file]));
            newPosition[parseInt(rankTo)][parseInt(fileTo)] = pieceFrom;
            newPosition[parseInt(rankFrom)][parseInt(fileFrom)] = "-";
            dispatch(makeNewMove({newPosition}));
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
            {currentPosition.map((r, rank) => 
                r.map((f, file) => 
                    currentPosition[rank][file]
                    ?   <Piece
                            key={rank + "-" + file}
                            rank={rank}
                            file={file}
                            piece={currentPosition[rank][file]}
                            handlePieceClick={handlePieceClick}
                        />
                    :   null
                )
            )}
        </div>
    );
}
 
export default Pieces;