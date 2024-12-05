import { FEN_to_str } from "../const/const";

export const getFileChar = (file) => String.fromCharCode(file + 96);

export const getTileClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--dark" : " tile--light";
    return c;
}

export const translate_FEN_row_arr = (row_arr) => {    
    return row_arr.map((info) => FEN_to_str.get(info)).flat(Infinity);
}