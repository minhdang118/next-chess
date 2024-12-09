import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getFirstElementOfArr, getInfoFromPieceClassName, getLastElementOfArr, getSecondLastElementOfArr } from "../../utils/helper";
import { useState } from "react";
import { useAppContext } from "../../contexts/Context";
import { clearCandidateMoves, generateCandidateMoves, makeNewMove } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";
import { blankPieceNotation, pawnNotation } from "../../const";

const Pieces = () => {
    const {appState, dispatch} = useAppContext();
    const currentPosition = getLastElementOfArr(appState.position);
    const turn = appState.turn;

    const [isPickingPiece, setIsPickingPiece] = useState(false);
    const [pieceFrom, setPieceFrom] = useState(null);
    const [rankFrom, setRankFrom] = useState(null);
    const [fileFrom, setFileFrom] = useState(null);

    function pickPiece(p, r, f) {
        setPieceFrom(p);
        setRankFrom(r);
        setFileFrom(f);
        setIsPickingPiece(true);

        // get moves
        const candidateMoves = arbiter.getValidMoves({
            position: currentPosition, 
            prevPosition: getSecondLastElementOfArr(appState.position),
            piece: p, 
            rank: parseInt(r), 
            file: parseInt(f)
        });
        dispatch(generateCandidateMoves({candidateMoves}));
    }

    function movePieceAndChangePosition(pieceTo, rankTo, fileTo, colorTo) {
        const intRankFrom = parseInt(rankFrom);
        const intFileFrom = parseInt(fileFrom);
        const intRankTo = parseInt(rankTo);
        const intFileTo = parseInt(fileTo);
        
        // change currentPosition
        if (appState.candidateMoves?.find((m) => m[0] === intRankTo & m[1] === intFileTo)) {
            const newPosition = 
                currentPosition.map((r, rank) => 
                    r.map((f, file) => 
                        currentPosition[rank][file]));

            // en passant configurations
            if (pieceFrom.endsWith(pawnNotation) && 
                newPosition[intRankTo][intFileTo] === blankPieceNotation &&
                intRankFrom !== intRankTo && 
                intFileFrom !== intFileTo
                ) {
                newPosition[intRankFrom][intFileTo] = blankPieceNotation;
            }

            // regular move configurations
            newPosition[intRankTo][intFileTo] = pieceFrom;
            newPosition[intRankFrom][intFileFrom] = blankPieceNotation;
            dispatch(makeNewMove({newPosition}));
        } else {
            const colorFrom = getFirstElementOfArr(pieceFrom);
            // switch from moving to picking another piece of the same color
            if (colorFrom === colorTo && pieceFrom !== pieceTo) {
                pickPiece(pieceTo, rankTo, fileTo);
                return;
            }
        }
        
        setIsPickingPiece(false);
        dispatch(clearCandidateMoves());
    }

    const handlePieceClick = (e) => {
        const info = getInfoFromPieceClassName(e.target.className);
        const p = info.piece;
        const r = info.rank;
        const f = info.file;
        const c = getFirstElementOfArr(p);

        if (!isPickingPiece) {
            // cannot pick a blank piece or a piece of a color that is not their turn
            if (p === blankPieceNotation || c !== turn) {
                return null;
            } else {
                return pickPiece(p, r, f);
            }
        } else {
            return movePieceAndChangePosition(p, r, f, c);
        }
    }

    return (
        <div className="pieces">
            {currentPosition.map((r, rank) => 
                r.map((f, file) => 
                    currentPosition[rank][file]
                    ?   <Piece
                            key={rank + "_" + file}
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