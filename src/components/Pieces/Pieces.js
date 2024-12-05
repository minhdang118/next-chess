import "../../styles/Pieces.css";
import Piece from "./Piece";
import { translate_FEN_row_arr } from "../../utils/helper";

const Pieces = () => {
    const starting_FEN = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2";
    const FEN_split = starting_FEN.split(' ');
    const FEN_rows = FEN_split[0].split('/');

    const FEN_arrs = FEN_rows.map((row_str) => row_str.split(''));

    const position = FEN_arrs.reverse().map((row_arr) => translate_FEN_row_arr(row_arr));

    console.log(position);

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