import "../../../styles/Pieces.css";
import Piece from "./Piece";
import { getArrayElement, getInfoFromPieceClassName } from "../../../utils/helper";
import { useState } from "react";
import arbiter from "../../../arbiter/arbiter";
import { ColorNotation, PieceNotation } from "../../../const";
import { getCastling } from "../../../arbiter/getMoves";
import { useSelector, useDispatch } from 'react-redux';
import { clearCandidateMoves, generateCandidateMoves, makeNewMove, openPromotionBox, selectCandidateMoves, selectCastlingDirections, selectPositions, selectTurn, updateCastling } from "../../../app/gameSlice";

const Pieces = () => {
    const positions = useSelector(selectPositions);
    const turn = useSelector(selectTurn);
    const candidateMoves = useSelector(selectCandidateMoves);
    const castlingDirections = useSelector(selectCastlingDirections);

    const currPosition = getArrayElement.last(positions);
    const prevPosition = getArrayElement.secondLast(positions);
    const dispatch = useDispatch();

    const [isPickingPiece, setIsPickingPiece] = useState(false);
    const [pieceFrom, setPieceFrom] = useState(null);
    const [rankFrom, setRankFrom] = useState(null);
    const [fileFrom, setFileFrom] = useState(null);

    function pickPiece(piece, rank, file) {
        setPieceFrom(piece);
        setRankFrom(rank);
        setFileFrom(file);
        setIsPickingPiece(true);

        const color = getArrayElement.first(piece);

        // get moves
        const candidateMoves = arbiter.getValidMoves({
            currPosition, 
            prevPosition,
            castlingDirections: castlingDirections[color],
            piece, 
            rank, 
            file
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
        
        // change position
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
                currPosition,
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
            {currPosition.map((r, rank) => 
                r.map((f, file) => 
                    currPosition[rank][file]
                    ?   <Piece
                            key={rank + "_" + file}
                            rank={rank}
                            file={file}
                            piece={currPosition[rank][file]}
                            handlePieceClick={handlePieceClick}
                        />
                    :   null
                )
            )}
        </div>
    );
}
 
export default Pieces;