import {
    calculateAngle,
    getDistancePoints,
} from '../../modules/feature_functions.js';
import { UNDIRECTED_GRAPH, WEIGHTED_GRAPH } from './constants.js';

export class EDGE {
    constructor(context, p1, p2, type, weighted, radius = 10) {
        this.context = context;
        this.p1 = p1;
        this.p2 = p2;
        this.type = type;
        this.weighted = weighted;
        this.radius = radius;
        this.isMoved = false;

        this.update_head_arrow();
    }

    draw(radius = 0) {
        if (this.type.directed === UNDIRECTED_GRAPH) {
            this.draw_line();
        } else this.draw_arrow(radius);
        if (this.type.weighted === WEIGHTED_GRAPH) this.draw_weighted();
    }

    draw_line() {
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.moveTo(this.p1.x, this.p1.y);
        this.context.lineTo(this.p2.x, this.p2.y);
        this.context.stroke();

        this.context.closePath();
    }

    draw_arrow(radius) {
        this.context.beginPath();
        this.context.moveTo(this.p1.x, this.p1.y);
        this.context.lineTo(this.p2.x, this.p2.y);

        //draw arrow
        let nx = this.p2.x + this.cosAngle * radius;
        let ny = this.p2.y - this.sinAngle * radius;

        ny = this.p2.y < this.p1.y ? this.p2.y + this.sinAngle * radius : ny;
        nx = this.p2.x > this.p1.x ? this.p2.x - this.cosAngle * radius : nx;

        if (isNaN(this.angleC)) {
            nx = this.p2.x;
            ny =
                this.p2.y > this.p1.y ? this.p2.y - radius : this.p2.y + radius;
        }

        // draw head arrow
        let headlen = 10; // length of head in pixels
        let dx = this.p2.x - this.p1.x;
        let dy = this.p2.y - this.p1.y;
        let angle = Math.atan2(dy, dx);
        this.context.moveTo(nx, ny);
        this.context.lineTo(
            nx - headlen * Math.cos(angle - Math.PI / 6),
            ny - headlen * Math.sin(angle - Math.PI / 6)
        );
        this.context.moveTo(nx, ny);
        this.context.lineTo(
            nx - headlen * Math.cos(angle + Math.PI / 6),
            ny - headlen * Math.sin(angle + Math.PI / 6)
        );
        this.context.stroke();

        this.context.closePath();
    }

    draw_weighted() {
        if (!this.isMoved) {
            const mp = {
                x: (this.p1.x + this.p2.x) / 2,
                y: (this.p1.y + this.p2.y) / 2,
            };
            const DISTANCE = 10;
            // this.wx = isNaN(this.sinAngle)
            //     ? mp.x + DISTANCE
            //     : mp.x + this.sinAngle * DISTANCE;
            // this.wy = isNaN(this.cosAngle)
            //     ? mp.y
            //     : mp.y - this.cosAngle * DISTANCE;
            this.wx = mp.x;
            this.wy = mp.y;
        }

        this.context.fillStyle = '#BAC2A3';
        this.context.arc(this.wx, this.wy, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.fillStyle = 'black';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(this.weighted, this.wx, this.wy);
    }

    update_head_arrow() {
        const p3 = { x: this.p1.x, y: this.p2.y };
        const a = getDistancePoints(this.p2, p3);
        const b = getDistancePoints(this.p1, this.p2);
        const c = getDistancePoints(this.p1, p3);

        this.angleC = calculateAngle(a, b, c);
        const angleInRadians = (this.angleC * Math.PI) / 180;
        this.cosAngle = Math.cos(angleInRadians);
        this.sinAngle = Math.sin(angleInRadians);
    }

    update(p1 = null, p2 = null) {
        if (p1) this.p1 = p1;
        if (p2) this.p2 = p2;

        this.update_head_arrow();
    }

    is_click_weighted(pos) {
        if (this.type.weighted === WEIGHTED_GRAPH)
            if (
                pos.x >= this.wx - this.radius &&
                pos.x <= this.wx + this.radius
            )
                if (
                    pos.y >= this.wy - this.radius &&
                    pos.y <= this.wy + this.radius
                ) {
                    return true;
                }
        return false;
    }
}
