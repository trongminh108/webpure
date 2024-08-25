export default class DIJKSTRA {
    static get MAX_VALUE() {
        return Number.MAX_SAFE_INTEGER;
    }

    constructor(matrix, start) {
        start--;
        this.matrix = matrix.map((row, i) => {
            const arr = [...row];
            return arr.map((col, j) =>
                i != j && col == 0 ? DIJKSTRA.MAX_VALUE : col
            );
        });
        this.n = matrix.length;
        this.previous = new Array(this.n).fill(start);
        this.isVisited = new Array(this.n).fill(false);
        this.distance = [...this.matrix[start]];
        this.start = start;
        this.res = [];
    }

    Solve() {
        let u = this.start;
        this.UpdateResult();
        for (let i = 0; i < this.n - 1; i++) {
            let min = DIJKSTRA.MAX_VALUE;
            for (let j = 0; j < this.n; j++) {
                if (min > this.distance[j] && !this.isVisited[j]) {
                    min = this.distance[j];
                    u = j;
                }
            }
            this.isVisited[u] = true;
            for (let v = 0; v < this.n; v++) {
                if (!this.isVisited[v]) {
                    const tmp = this.distance[u] + this.matrix[u][v];
                    if (this.distance[v] > tmp) {
                        this.distance[v] = tmp;
                        this.previous[v] = u;
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
            isVisited: [...this.isVisited],
        });
    }

    GetResult() {
        this.Solve();
        return this.res;
    }
}

// Infinity = 1000
//     def __init__(self, matrix, s) -> None:
//         self.a = matrix
//         self.n = len(matrix)
//         self.truoc = [s]*self.n
//         self.ChuaXet = [True]*self.n
//         self.ChuaXet[s] = False
//         for i in range(len(self.a)):
//             for j in range(len(self.a[0])):
//                 if i != j and self.a[i][j] == 0:
//                     self.a[i][j] = Dijkstra.Infinity
//         self.d = [i for i in self.a[s]]

//     def Solve(self):
//

//     def Display(self):
//         self.Solve()
//         print(self.d)
//         print([i+1 for i in self.truoc])
