console.log("My Javascript assessment");

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const row = 10;
const col = 10;

/*create Field Class with constructor */
class Field{

//field = [];
    constructor(field=[[]]){
        this.field = field;
        this.locationX=0;
        this.locationY=0;
        this.field[0][0]=pathCharacter; //default chara location

    //shows field area-> 2D array
    for (let a = 0; a < col ;a++){
        this.field[a] = [];        
    }
    //probability of holes generation
    this.generateField(row, col, 0.2);
    }


/*Create generateField method in field class to generate the row and column w/ field */
    //generate random holes
    generateField(height, width, percentage = 0.1) {

        for (let y=0; y< height; y++){
            for (let x=0; x<width; x++){
                const prob = Math.random();
                this.field[y][x] = fieldCharacter;
            }
        }

    //Set hat location
    
    let hatLocationAxisY = Math.floor(Math.random()*10)+1;
    let hatLocationAxisX = Math.floor(Math.random()*10)+1;
    this.field=[hatLocationAxisY][hatLocationAxisX] = hat;
    return this.field;

    }

/*Create runGame, print, askQuestion methods for game */
    runGame(){
        let runGameon = true;
        this.print();
        this.askQuestion();
        while (runGameon){
            if(this.out()){
                console.log("sorry, out");
                runGameon= false;
            }
            else if(this.meetHat()){
                console.log("You found your hat!!!");
                runGameon= false;
            }
            else if(this.meetHole()){
                console.log("You drop into hole!!!");
                runGameon= false;
            }
        }
        
    }
    
    meetHat(){
        return this.field[this.locationY][this.locationX] === hat;
    }

    meetHole(){       
        return this.field[this.locationY][this.locationX] === hole;
    }
    out(){
        

    }
    

    
    //print
        //clear previous msg, then show new msg
    print(){
        clear();
        const displayString= this.field.map(row=>{
            return row.join('');
        }).join('\n');
        console.log(displayString);
    }

    askQuestion(){
        //if gameplay still valid
        const answer= prompt('Which way?').toUpperCase();
        //direction movement using WASD key instead
        switch (answer){ //y-> vertical, x-> horizonal
            case 'w': //up
            this.locationY-=1;
            break;
            case 'a': //left
            this.locationX-=1;
            break;
            case 's': //down
            this.locationY+=1;
            break;
            case 'd': //right
            this.locationX+=1;
            break;
            default:
            console.log('Input direction. Key: W, A, S, D');
            break;
        }
        
    }

}//End of Class

/*instanmtiate Field class to initialise constructor and generate row & column for generate Field Method
Call runGame Method to run game */
const myfield = new Field();
myfield.runGame();