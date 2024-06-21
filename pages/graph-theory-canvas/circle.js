import {
    getNumRanInt,
    getDistancePoints,
} from '../../modules/feature_functions.js';

const colors = [
    '#FF5733', // Red-Orange
    '#33FF57', // Green
    '#3357FF', // Blue
    '#FF33A1', // Pink
    '#FF8C33', // Orange
    '#8C33FF', // Purple
    '#33FFD5', // Aqua
    '#FFEB33', // Yellow
    '#FF3333', // Red
    '#33FF83', // Light Green
    '#33A1FF', // Sky Blue
    '#8CFF33', // Lime Green
    '#FF333D', // Dark Red
    '#A133FF', // Violet
    '#FFD533', // Gold
    '#33D5FF', // Cyan
    '#FF33EB', // Magenta
    '#337DFF', // Royal Blue
    '#FF5733', // Coral
    '#338CFF', // Azure
    '#33FFB2', // Mint
    '#FF338C', // Hot Pink
    '#D533FF', // Orchid
    '#57FF33', // Neon Green
    '#5733FF', // Indigo
    '#33FF57', // Sea Green
    '#FF5733', // Sunset Orange
    '#FF33B2', // Fuchsia
    '#33FFEB', // Light Cyan
    '#FF5733', // Burnt Orange
];

export class CIRCLE {
    constructor(context, x, y, r, text = '') {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = r;
        this.text = text;
        this.color = colors[getNumRanInt(0, 10)];
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color;
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.fill();
        this.context.closePath();

        //draw text
        this.context.fillStyle = 'black';
        this.context.font = '12px black';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText(this.text, this.x, this.y);
    }

    clear() {
        this.context.clearRect(
            this.x - this.radius - 1,
            this.y - this.radius - 1,
            this.radius * 2 + 2,
            this.radius * 2 + 2
        );
    }

    update(width, height) {
        if (this.x + this.radius >= width) this.dx *= -1;
        if (this.x - this.radius <= 0) this.dx *= -1;
        if (this.y + this.radius >= height) this.dy *= -1;
        if (this.y - this.radius <= 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;
    }

    isOverlapping(pos, radius) {
        if (pos.x >= this.x - this.radius && pos.x <= this.x + this.radius) {
            if (
                pos.y >= this.y - this.radius &&
                pos.y <= this.y + this.radius
            ) {
                const p = { x: this.x, y: this.y };
                if (getDistancePoints(p, pos) <= radius + this.radius)
                    return true;
            }
        }
        return false;
    }

    isInCircle(pos) {
        if (pos.x >= this.x - this.radius && pos.x <= this.x + this.radius) {
            if (
                pos.y >= this.y - this.radius &&
                pos.y <= this.y + this.radius
            ) {
                return true;
            }
        }
        return false;
    }

    isCollision(other) {
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return distance + 1 <= this.radius + other.radius;
    }
}
