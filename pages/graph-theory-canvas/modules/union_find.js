class UnionFind {
    constructor(size) {
        this.parent = Array.from({ length: size }, (_, index) => index);
        this.rank = Array(size).fill(0);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX === rootY) return false; // Cycle detected

        if (this.rank[rootX] > this.rank[rootY]) {
            this.parent[rootY] = rootX;
        } else if (this.rank[rootX] < this.rank[rootY]) {
            this.parent[rootX] = rootY;
        } else {
            this.parent[rootY] = rootX;
            this.rank[rootX] += 1;
        }

        return true;
    }
}

// Function to check if adding an edge creates a cycle
export function willCreateCycle(arr, newEdge, numberOfVertices) {
    const unionFind = new UnionFind(numberOfVertices);

    // Add existing edges to the union-find structure
    const edges = arr.map((item) => item.edge);
    if (edges.length > 0) {
        for (const [u, v] of edges) {
            unionFind.union(u, v);
        }

        // Check if adding the new edge creates a cycle
        const [u, v] = newEdge;
        return !unionFind.union(u, v);
    }
    return false;
}
