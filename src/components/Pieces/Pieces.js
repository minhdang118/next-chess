import "../../styles/Pieces.css";
import Piece from "./Piece";
import { FEN_to_str } from "../../const/const";

const Pieces = () => {
    const position = new Array(8).fill("").map((x) => new Array(8).fill(""));
    const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
    const FENarray = startingFEN.split(' ');
    const FENrows = FENarray[0].split('/');

    FENrows.map((row, i) => 
        row.split('').map((piece, j) => 
            position[7-i][j] = FEN_to_str.get(piece)
        ));
    // console.log(position);

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
                        />
                    :   null
                )
            )}
        </div>
    );
}
 
export default Pieces;