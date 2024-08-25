export default class FORD_BELLMAN {
    static get MAX_VALUE() {
        return Number.MAX_SAFE_INTEGER;
    }

    constructor(matrix, start) {
        start--;
        this.matrix = matrix.map((row, i) => {
            const arr = [...row];
            return arr.map((col, j) =>
                i != j && col == 0 ? FORD_BELLMAN.MAX_VALUE : col
            );
        });

        this.n = this.matrix.length;
        this.isVisited = new Array(this.n).fill(false);
        this.previous = new Array(this.n).fill(start);
        this.distance = [...this.matrix[start]];
        this.start = start;
        this.res = [];
    }

    Solve() {
        const loop = this.n - 2;
        this.UpdateResult();
        for (let i = 0; i < loop; i++) {
            for (let v = 0; v < this.n; v++) {
                if (v != this.start) {
                    for (let u = 0; u < this.n; u++) {
                        if (
                            this.distance[v] >
                            this.distance[u] + this.matrix[u][v]
                        ) {
                            this.distance[v] =
                                this.distance[u] + this.matrix[u][v];
                            this.previous[v] = u;
                        }
                    }
                }
            }
            this.UpdateResult();
        }
    }

    UpdateResult() {
        this.res.push({
            distance: [...this.distance],
            previous: [...this.previous],
        });
    }

    GetResult() {
        this.Solve();
        return this.res;
    }
}
