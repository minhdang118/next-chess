import { getMoves } from "./getMoves";

const arbiter = {
    getRegularMoves : function({position, piece, rank, file}) {
        return getMoves({position, piece, rank, file})
    }
}

export default arbiter;