let streams = [];
const symbolSize = 24;

function setup() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    createCanvas(w, h);

    let x = 0; // coordinate of the streams
    let y = 0;
    for (let i = 0; i <= width / symbolSize; i++) {
        let stream = new Stream();
        stream.generateSymbols(x,y);
        streams.push(stream);
        x += symbolSize;
        y = random(0,-height/2)
    }
    
    textSize(symbolSize);
}

function draw() {
    background(0, 120);
    streams.forEach(stream => {
        stream.render();
    })
}

class Stream {
    constructor() {

        this.symbols = [];
        this.totalSymbols = round(random(5,30));
        this.speed = random(5, 10);
    }

    generateSymbols(x,y) {
        let first = round(random(0,4)) == 1; // 50% true
        for (var i =0; i <= this.totalSymbols; i++) {
            let symbol = new Symbol(x, y, this.speed, first);
            symbol.setToRandomSymbol();
            this.symbols.push(symbol);
            y -= symbolSize;
            first = false;
        }
    }

    render() {
        this.symbols.forEach(symbol => {
            if (symbol.first) {
                fill(180, 255, 180);
            } else {
                fill(0, 255, 70)
            }
            text(symbol.value, symbol.x, symbol.y);
            symbol.rain();
            symbol.setToRandomSymbol();
        }) 
    }
}


class Symbol {

    constructor(_x,_y, _speed, _first){
        this.x = _x;
        this.y = _y;
        this.value;
        this.speed = _speed;
        this.switchInterval = round(random(2, 20));
        this.first = _first;
    }

    setToRandomSymbol() {
        if (frameCount % this.switchInterval == 0) {
            this.value = String.fromCharCode(
                //japanese code
                0x30A0 + round(random(0,96))
            );
        }
    }

    rain() {
        this.y = (this.y >= height) ? 0 : this.y += this.speed;
    }

}




