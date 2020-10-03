const fs = require('fs')
const util = require('util')

// Création de la classe Tondeuse
class Tondeuse {

    // Constructeur
    constructor(x, y, orientation, max_x, max_y){
        this.x = x
        this.y = y
        this.orientation = orientation
        this.limite_x = max_x
        this.limite_y = max_y
    }

    // Gestion des instructions reçues par la tondeuse
    instruction(instr){
        if(instr === 'D' || instr === 'G') this.tourner(instr)
        else this.avancer()
    }

    // Gestion de l'action de tourner
    tourner(direction){
        if(this.orientation === 'N'){
            if(direction === 'D') this.orientation = 'E'
            else this.orientation = 'W'
        } else if(this.orientation === 'E'){
            if(direction === 'D') this.orientation = 'S'
            else this.orientation = 'N'
        } else if(this.orientation === 'W'){
            if(direction === 'D') this.orientation = 'N'
            else this.orientation = 'S'
        } else if(this.orientation === 'S'){
            if(direction === 'D') this.orientation = 'W'
            else this.orientation = 'E'
        }
    }

    // Gestion de l'action de avancer
    avancer(){
        if(this.orientation === 'N'){
            if(this.y < this.limite_y) this.y += 1
        } else if(this.orientation === 'E'){
            if(this.x < this.limite_x) this.x += 1
        } else if(this.orientation === 'W'){
            if(this.x > 0) this.x -= 1
        } else if(this.orientation === 'S'){
            if(this.y > 0) this.y -= 1
        }
    }

    // Fonction d'affichage
    affichage_position(){
        console.log(`${this.x}${this.y}${this.orientation}`)
    }
}

// Lecture du fichier
const readFile = util.promisify(fs.readFile)

let read_file = () => {
    return readFile('entre.txt', 'utf8')
}

// Split les coordonées x et y
const split_position_x_y = (str) => {
    return str.split('')
}

// Initialisation
const initialisation = () => {
    read_file().then((data) => {
        var array = data.split(/\r?\n/)
        pelouse = split_position_x_y(array[0])
        max_x = parseInt(pelouse[0])
        max_y = parseInt(pelouse[1])


        for(let i = 1; i < array.length; i+=2){
            // Création de l'objet tondeuse
            position = array[i].split(' ')
            coordonnes = split_position_x_y(position[0])
            let tondeuse = new Tondeuse(parseInt(coordonnes[0]), parseInt(coordonnes[1]), position[1], max_x, max_y)
            
            // Mouvements de tondeuse
            mouvements_tondeuse = array[i+1].split('')

            // Pour chaque mouvement, l'instruction est communiquée à la tondeuse
            mouvements_tondeuse.forEach(element => {
                tondeuse.instruction(element)
            })

            // Résultat final
            tondeuse.affichage_position()
        }
    })
}

initialisation()
