import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getArrayElement, getInfoFromPieceClassName } from "../../utils/helper";
import { useState } from "react";
import { useAppContext } from "../../contexts/Context";
import { clearCandidateMoves, generateCandidateMoves, makeNewMove } from "../../reducer/actions/move";
import arbiter from "../../arbiter/arbiter";
import { ColorNotation, PieceNotation } from "../../const";
import { openPromotionBox } from "../../reducer/actions/popup";
import { updateCastling } from "../../reducer/actions/game";
import { getCastling } from "../../arbiter/getMoves";

const Pieces = () => {
    const {appState, dispatch} = useAppContext();
    const {position, turn, candidateMoves, castlingDirections} = appState;
    const currentPosition = getArrayElement.last(position);

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
            prevPosition: getArrayElement.secondLast(position),
            castlingDirections: castlingDirections[turn],
            piece: p, 
            rank: r, 
            file: f
        });
        dispatch(generateCandidateMoves({candidateMoves}));
    }

    function movePieceAndChangePosition(pieceTo, rankTo, fileTo) {

        const colorFrom = getArrayElement.first(pieceFrom);
        const colorTo = getArrayElement.first(pieceTo);

        // switch from moving to picking another piece of the same color
        if (colorFrom === colorTo) {
            pickPiece(pieceTo, rankTo, fileTo);
            return;
        }
        
        // change currentPosition
        if (candidateMoves?.find((m) => m[0] === rankTo & m[1] === fileTo)) {
            
            // pawn promotion
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

            // update castling rights
            if (pieceFrom.endsWith(PieceNotation.king) || pieceFrom.endsWith(PieceNotation.rook)) {
                const directions = getCastling.directions({
                    castlingDirections,
                    piece: pieceFrom, 
                    rank: rankFrom, 
                    file: fileFrom
                });
                
                dispatch(updateCastling({directions}));
            }
        }
        
        setIsPickingPiece(false);
        dispatch(clearCandidateMoves());
    }

    const handlePieceClick = (e) => {
        const info = getInfoFromPieceClassName(e.target.className);
        const piece = info.piece;
        const rank = parseInt(info.rank);
        const file = parseInt(info.file);
        const color = getArrayElement.first(piece);

        if (!isPickingPiece) {
            // cannot pick a blank piece or a piece of a color that is not their turn
            if (piece === PieceNotation.blank || color !== turn) {
                return null;
            } else {
                return pickPiece(piece, rank, file);
            }
        } else {
            return movePieceAndChangePosition(piece, rank, file);
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