// classes in JS 


/* 







*/
class Rectangle{
    constructor(width,height,color){
        this.width=width;
        this.height = height;
        this.color = color;
    }
    area(){
        const area = this.height*this.width;
        return area
    }

    paint(){
        console.log(`We are painting this rectangle with ${this.color}`);
    }
}

const rect = new Rectangle(5,6,"red")

const area = rect.area()
console.log(area);
console.log(`${rect.color} is the color of my rectangle `);