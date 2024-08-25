export default class FLOYD {
    static get MAX_VALUE() {
        return Number.MAX_SAFE_INTEGER;
    }

    constructor(matrix) {
        this.distance = matrix.map((row, i) => {
            const arr = [...row];
            return arr.map((col, j) =>
                i != j && col == 0 ? FLOYD.MAX_VALUE : col
            );
        });
        this.n = matrix.length;
        this.previous = matrix.map((row, i) => new Array(this.n).fill(i));
    }

    Solve() {
        this.data = [];
        for (let k = 0; k < this.n; k++) {
            for (let i = 0; i < this.n; i++) {
                for (let j = 0; j < this.n; j++) {
                    if (
                        this.distance[i][j] >
                        this.distance[i][k] + this.distance[k][j]
                    ) {
                        this.distance[i][j] =
                            this.distance[i][k] + this.distance[k][j];
                        this.previous[i][j] = this.previous[k][j];
                    }
                }
            }
            this.data.push({
                distance: [...this.distance].map((row) => [...row]),
                previous: [...this.previous].map((row) =>
                    row.map((col) => col + 1)
                ),
            });
        }
    }
}
