import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getArrayElement, getInfoFromPieceClassName } from "../../utils/helper";
import { useState } from "react";
import { useAppContext } from "../../contexts/Context";
import { clearCandidateMoves, generateCandidateMoves, makeNewMove } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";
import { ColorNotation, PieceNotation } from "../../const";
import { openPromotionBox } from "../../reducer/actions/popup";

const Pieces = () => {
    const {appState, dispatch} = useAppContext();
    const currentPosition = getArrayElement.last(appState.position);
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
            prevPosition: getArrayElement.secondLast(appState.position),
            piece: p, 
            rank: r, 
            file: f
        });
        dispatch(generateCandidateMoves({candidateMoves}));
    }

    function movePieceAndChangePosition(pieceTo, rankTo, fileTo, colorTo) {
        
        // change currentPosition
        if (appState.candidateMoves?.find((m) => m[0] === rankTo & m[1] === fileTo)) {
            // check for pawn promotion availability
            if ((pieceFrom === ColorNotation.white + PieceNotation.pawn &&  rankTo === 0) ||
                (pieceFrom === ColorNotation.black + PieceNotation.pawn &&  rankTo === 7)) {
                setIsPickingPiece(false);
                dispatch(openPromotionBox({rankFrom, fileFrom, rankTo, fileTo}));
                return;
            }

            // perform a move
            const newPosition = arbiter.performMove({
                currentPosition,
                pieceFrom, rankFrom, fileFrom,
                pieceTo, rankTo, fileTo
            });
            
            dispatch(makeNewMove({newPosition}));
        } else {
            const colorFrom = getArrayElement.first(pieceFrom);
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
        const r = parseInt(info.rank);
        const f = parseInt(info.file);
        const c = getArrayElement.first(p);

        if (!isPickingPiece) {
            // cannot pick a blank piece or a piece of a color that is not their turn
            if (p === PieceNotation.blank || c !== turn) {
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