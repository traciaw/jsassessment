console.log("My Javascript assessment");

const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
 
const hat = '♛';
const hole = '◡';
const fieldCharacter = '▒';
const pathCharacter = '●';
const row = 10;
const col = 10;

/*create Field Class with constructor */
class Field{

field = [];

    constructor(){

        //the current location of your character, default location 0,0
        this.locationX=0;
        this.locationY=0;

    //shows field area-> 2D array
    for (let a = 0; a < col ;a++){
        this.field[a] = [];        
    }
    //probability of holes generation
    //passing 0.2 as the argument of % to the generateField method
    this.generateField(row, col, 0.2);
    }

    isInBoundary()
    {
        //return true or false
        //right = X +1
        //left = X -1
        //Up = Y -1
        //Down = Y+1

        //need check if location Y within 0 and width-1(9)
        //need check if location X within 0 and height-1(9)

        if(this.locationY >=0 && this.locationY<col 
            && this.locationX >=0 && this.locationX <row){
                return true;
            }
            return false;
    }

    runGame(){
        //Implement your code
    
        //print the field onto the terminal

        //If-else, forLoop, switch, do-while, or while
        let playing = true;
        while (playing){    

            this.print();
            this.askQuestion();


            //check if character is out of boundaries
            if(!this.isInBoundary()) //return true/false
            {
                console.log("Out of Bounds, Game Over");
                playing = false;
            }
            else{
                if(this.field[this.locationY][this.locationX]==hole)
                {
                    console.log("Sorry you fell into hole, Game Over");
                    playing = false;
                }
                //check if character gets the hat
                else if(this.field[this.locationY][this.locationX]==hat)
                {
                    console.log("You Found the Hat! Congrats, you WIN!")
                    playing = false;
                }
                //update location of character
                this.field[this.locationY][this.locationX] = pathCharacter;
                }

            }
    }

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
            case 'W': //up
            this.locationY-=1;
            break;
            case 'A': //left
            this.locationX-=1;
            break;
            case 'S': //down
            this.locationY+=1;
            break;
            case 'D': //right
            this.locationX+=1;
            break;
            default:
            console.log('Input direction. Key: W, A, S, D');
            this.askQuestion();
            break;
        }
    }   

/*Create generateField method in field class to generate the row and column w/ field */
    //generate random holes
    //If there is no argument passed in from in from the calling method, the default value of % is 0.1
    generateField(height, width, percentage) {

        //percentage = 0.2

        for (let y=0; y< height; y++){
            for (let x=0; x<width; x++){

                //Generate random holes
                const prob = Math.random();
                //0-1 (eg 0.25)

                /*Step 1: random the holes Char onto the field
                random number that is generated to compare to the % that you have set (0.2)
                Based on probability of the random number*/

                /*
                prob =0.25, %=0.2
                prob =0.1, %=0.2
                prob =0.07, %=0.2
                
                if prob <%, generate hole
                if prob >%, generate fieldCharacter

                thus, more fieldCharacter compared to holes

                if (prob < percentage) {
                this.field[y][x] = hole;
                } else {
                this.field[y][x] = fieldCharacter;
                }
                */
                //this.field[y][x] = fieldCharacter;
                //tenanary operator
                this.field[y][x]= prob>percentage? fieldCharacter: hole;
                
                //
               
            }
        }

        //Set the hat location randomly
        //Two Math.random() - to populate x & y axis
        let hatX = Math.floor(Math.random() * width) //0-9
        let hatY = Math.floor(Math.random() * height) 

        //What if hatX & hatY is 0,0 - it will replace the character with hat
        //check if hat will replace character or not - Char position is 0,0
        do{
            hatX = Math.floor(Math.random() * width);
            hatY = Math.floor(Math.random() * height);
        }
        while (hatX==0 && hatY==0) //||(0,6), (4,0), (0,1)

        //5,6- set the position of the hat
        this.field[hatY][hatX]= hat;

        //set character position as [0][0]
        this.field[0][0] = pathCharacter;

    }
}


/*Create an instance object of the Field Class */
const myfield = new Field();
myfield.runGame();
