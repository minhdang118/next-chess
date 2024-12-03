export const getFileChar = (file) => String.fromCharCode(file + 96);

export const getTileClassName = (i, j) => {
    let c = "tile";
    c += (i + j) % 2 === 0 ? " tile--light" : " tile--dark";
    return c;
}