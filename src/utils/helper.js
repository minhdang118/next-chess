import { fen_to_str } from "../const/const";

export const getFileChar = (file) => String.fromCharCode(file + 96);

export const getTileClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--dark" : " tile--light";
    return c;
}

export const getPositionFromFen = (fen) => {
    const fen_split = fen.split(' ');
    const fen_rows = fen_split[0].split('/');
    const fen_arrs = fen_rows.map((row_str) => row_str.split(''));

    return fen_arrs.map((row_arr) => translateFenRowArr(row_arr));
}

export const translateFenRowArr = (row_arr) => {    
    return row_arr.map((info) => fen_to_str.get(info)).flat(Infinity);
}
