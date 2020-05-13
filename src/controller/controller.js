export const cards = [
    { color: 'green', isFliped: false, isDone: false },
    { color: 'green', isFliped: false, isDone: false },
    { color: 'red', isFliped: false, isDone: false },
    { color: 'red', isFliped: false, isDone: false },
    { color: 'blue', isFliped: false, isDone: false },
    { color: 'blue', isFliped: false, isDone: false },
    { color: 'black', isFliped: false, isDone: false },
    { color: 'black', isFliped: false, isDone: false },
    { color: 'yellow', isFliped: false, isDone: false },
    { color: 'yellow', isFliped: false, isDone: false },
    { color: 'grey', isFliped: false, isDone: false },
    { color: 'grey', isFliped: false, isDone: false }
];

export const shuffleArray = (Arr) => {
    let x, j;
    for (let i = Arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = Arr[i];
        Arr[i] = Arr[j];
        Arr[j] = x;
    }
    return Arr;
}

