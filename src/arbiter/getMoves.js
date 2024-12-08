import { getFirstElementOfArr } from "../utils/helper";

const offsets = Array(7).fill().map((x, i) => i + 1);

export const getMoves = ({position, piece, rank, file}) => {
    const moves = [];
    const myColor = getFirstElementOfArr(piece);
    const oppColor = myColor === "w" ? "b" : "w";
    const directions = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1]
    ];
    directions.forEach((dir) => {
        for (const offset of offsets) {
            const r = rank + (offset * dir[0]);
            const f = file + (offset * dir[1]);
            
            if (position?.[r]?.[f] === undefined) {
                break;
            }
            if (position[r][f].startsWith(oppColor)) {
                moves.push([r, f]);
                break;
            }
            if (position[r][f].startsWith(myColor)) {
                break;
            }
            moves.push([r, f]);
        }
    });

    return moves;
}