const MATRIX_SIZE = 9;
const SUBSECTION_SIZE = 3;
const NO_VALUE = 0;
const MIN_VALUE = 1;
const MAX_VALUE = 9;
const MATRIX_START_INDEX = 0;

class Point {
    constructor(row, column, value = MIN_VALUE) {
        this.row = row;
        this.column = column;
        this.value = value;
    }
}

module.exports = function solveSudoku(matrix) {
    let empties = getEmpties(matrix);
    let i = 0;
    while (i < empties.length) {
        let point = empties[i];
        i = bruteForceValues(matrix, point, i);
    }
    return matrix;
};

function getEmpties(matrix) {
    let empties = [];
    for (let row = MATRIX_START_INDEX; row < MATRIX_SIZE; row++) {
        for (let column = MATRIX_START_INDEX; column < MATRIX_SIZE; column++) {
            if (matrix[row][column] === NO_VALUE) {
                empties.push(new Point(row, column));
            }
        }
    }
    return empties;
}

function bruteForceValues(matrix, point, i) {
    let isNotBack = false;
    while (!isNotBack && point.value <= MAX_VALUE) {
        if (checkValue(matrix, point.column, point.row, point.value)) {
            isNotBack = true;
            matrix[point.row][point.column] = point.value;
            i++;
        } else {
            point.value++;
        }
    }
    if (!isNotBack) {
        matrix[point.row][point.column] = 0;
        point.value = MIN_VALUE;
        i--;
    }
    return i;
}

function checkValue(matrix, column, row, value) {
    return rowConstraint(matrix, row, value) &&
        columnConstraint(matrix, column, value) &&
        subsectionConstraint(matrix, column, row, value);
}

function rowConstraint(matrix, row, value) {
    for (let column = MATRIX_START_INDEX; column < MATRIX_SIZE; column++) {
        if (matrix[row][column] === value) {
            return false;
        }
    }
    return true;
}

function columnConstraint(matrix, column, value) {
    for (let row = MATRIX_START_INDEX; row < MATRIX_SIZE; row++) {
        if (matrix[row][column] === value) {
            return false;
        }
    }
    return true;
}

function subsectionConstraint(matrix, column, row, value) {
    let rowSubsectionStart = calcSubsectionStart(row);
    let rowSubsectionEnd = calcSubsectionEnd(rowSubsectionStart);
    let columnSubsectionStart = calcSubsectionStart(column);
    let columnSubsectionEnd = calcSubsectionEnd(columnSubsectionStart);

    for (let r = rowSubsectionStart; r < rowSubsectionEnd; r++) {
        for (let c = columnSubsectionStart; c < columnSubsectionEnd; c++) {
            if (matrix[r][c] ===  value) {
                return false;
            }
        }
    }
    return true;
}

function calcSubsectionStart(index) {
    return Math.floor(index / SUBSECTION_SIZE) * SUBSECTION_SIZE;
}

function calcSubsectionEnd(subsectionStart) {
    return subsectionStart + SUBSECTION_SIZE;
}