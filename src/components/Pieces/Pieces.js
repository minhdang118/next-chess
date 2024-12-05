import "../../styles/Pieces.css";
import Piece from "./Piece";
import { getPositionFromFen } from "../../utils/helper";
import { useState } from "react";

const Pieces = () => {
    const starting_fen = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";
    // const position = getPositionFromFen(starting_fen);
    const [position, setPosition] = useState(getPositionFromFen(starting_fen));
    // console.log(position);
    const [isInMove, setIsInMove] = useState(false);

    const handlePieceClick = (e) => {
        // // pick piece
        // if (!isInMove) {
        //     const classNameSplit = e.target.className.split(' ');
        //     const pickedPiece = classNameSplit[1];
        //     const posSplit = classNameSplit[2].split('');
        //     const pickedRank = posSplit[2];
        //     const pickedFile = posSplit[3];
        //     console.log("pick", pickedPiece, pickedRank, pickedFile);
            
        //     setIsInMove(true);
        // } 
        // // move piece
        // else {
        //     console.log("move", e.target.className);
        //     setIsInMove(false);
        // }
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