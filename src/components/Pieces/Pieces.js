import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getFirstElementOfArr, getInfoFromPieceClassName, getLastElementOfArr } from "../../utils/helper";
import { useState } from "react";
import { useAppContext } from "../../contexts/Context";
import { clearCandidateMoves, generateCandidateMoves, makeNewMove } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";

const Pieces = () => {
    const {appState, dispatch} = useAppContext();
    const currentPosition = getLastElementOfArr(appState.position);

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

            // get moves
            const candidateMoves = arbiter.getRegularMoves({
                position: currentPosition, 
                piece: infoFrom.piece, 
                rank: parseInt(infoFrom.rank), 
                file: parseInt(infoFrom.file)
            });
            dispatch(generateCandidateMoves({candidateMoves}));
        }
    }

    function movePieceAndChangePosition(e) {
        const infoTo = getInfoFromPieceClassName(e.target.className);
        pieceTo = infoTo.piece;
        rankTo = infoTo.rank;
        fileTo = infoTo.file;

        const fromColor = getFirstElementOfArr(pieceFrom);
        const toColor = getFirstElementOfArr(pieceTo);

        // change currentPosition
        if (appState.candidateMoves?.find((m) => m[0] === parseInt(rankTo) & m[1] === parseInt(fileTo))) {
            const newPosition = currentPosition.map((r, rank) => r.map((f, file) => currentPosition[rank][file]));
            newPosition[parseInt(rankTo)][parseInt(fileTo)] = pieceFrom;
            newPosition[parseInt(rankFrom)][parseInt(fileFrom)] = "-";
            dispatch(makeNewMove({newPosition}));
        } else if (fromColor === toColor && pieceFrom !== pieceTo) {
                pickPiece(e);
                return;
        }
        
        setIsPickingPiece(false);
        dispatch(clearCandidateMoves());
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