import {
    calculateAngle,
    getDistancePoints,
} from '../../modules/feature_functions.js';

export class EDGE {
    constructor(context, p1, p2) {
        this.context = context;
        this.p1 = p1;
        this.p2 = p2;
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = 'black';
        this.context.moveTo(this.p1.x, this.p1.y);
        this.context.lineTo(this.p2.x, this.p2.y);
        this.context.stroke();
        this.context.closePath();
    }

    draw_arrow(radius) {
        let headlen = 10; // length of head in pixels
        let dx = this.p2.x - this.p1.x;
        let dy = this.p2.y - this.p1.y;
        let angle = Math.atan2(dy, dx);
        this.context.beginPath();
        this.context.moveTo(this.p1.x, this.p1.y);
        this.context.lineTo(this.p2.x, this.p2.y);

        //draw arrow
        const p3 = { x: this.p1.x, y: this.p2.y };
        const a = getDistancePoints(this.p1, this.p2);
        const b = getDistancePoints(this.p1, p3);
        const c = getDistancePoints(this.p2, p3);

        const angleA = calculateAngle(a, b, c);
        let angleInRadians = (angleA * Math.PI) / 180;
        let cosAngle = Math.cos(angleInRadians);
        let sinAngle = Math.sin(angleInRadians);

        let nx = this.p2.x + cosAngle * radius;
        let ny = this.p2.y - sinAngle * radius;

        ny = this.p2.y < this.p1.y ? this.p2.y + sinAngle * radius : ny;
        nx = this.p2.x > this.p1.x ? this.p2.x - cosAngle * radius : nx;

        // console.log('[ANGLE]: ' + angleA + ', ' + Math.sin(angleA));
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
}
