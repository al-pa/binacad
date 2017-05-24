'use strict'
//==================DECLARATION AREA==============================
class Fighter {
  // 1) **Створити класс “Fighter”** -->
  // 2) Клас повиненин приймати значення name, power і health. -->
  // 3) Також клас повинен мати методи “setDamage” та “hit”. -->
  // 4) Метод “setDamage” приймає значення “damage” і наносить урон змінюючи
  //    значення health (health = health - damage), і виводить в консоль
  //    строку “ health: ”. -->
  // 5) Метод “hit” приймає значення “enemy”, “point”, і в середині викликає
  //    метод переданого обекту “enemy.setDamage(damage)”. -->
  //     a) “damage” вираховується наступним чином - damage = point * power, -->
  //     b)  де point - змінний параметр, прийнятий в функцію "fight",
  //     c) power - це властивість об'єкту який наносить урон. -->
    constructor (name="Brave Fighter", power=1, health=100) {
        this.name=name;
        this.power=parseInt(power);
        this.health=parseInt(health);
    }
    setDamage(damage) {
        this.health+=-damage;
        console.log(`${this.name}'s health: ${this.health}`);
        return this.health;
    }
    hit(enemy, point) {
        let damage = point * this.power;
        return enemy.setDamage(damage);
    }
};

class ImprovedFighter extends Fighter {
  // 6) **Створити клас ImprovedFighter, який буде наслідуватися від класу
  //    Fighter, з його властивостями і методами.** -->
  // 7) Для цього класу створити метод doubleHit, який буде викликати
  //    наслідуваний метод “hit”, і передавати туди подвоєне значення “point”. -->
  // 8) Від обох класів породити по екземпляру відповідно fighter,
  //    improvedFighter. -->
    doubleHit(enemy, point) {
        return super.hit(enemy, point*2);
    }
};

function fight(fighter, improvedFighter, ...point) {
  // This function must initialize battle somehow and call fighters hit
  // functions with point inputs.
  // 11. Ця функція запускатиме процес гри:
  //     a) -Гравці по черзі наносять удар один одному за допомогою методу
  //     hit, що приймає відповідне значення point.
  //     b) -Якщо один із них помирає (health = 0), то гра закінчується і
  //     результат виводиться в консоль

    let first, second;
    (Math.random() < 0.5) ? ([first, second] = arguments) :
    ([second, first] = arguments);
    //decided who will have 1st turn;

    //Wrapper function to check if doubleHit exist

    for(let key of point) {
        // first.hit(second, key);
        bestHit(first, second, key);
            // ("doubleHit" in obj) ? first.doubleHit(second, key) :
            // first.hit(second, key)();
        // };
        if (second.health <= 0) return console.log(`${second.name} is dead,\
we have a winner! Congratulatin ${first.name}!`);
        second.hit(first, key);
        if (first.health <= 0) return console.log(`${first.name} is dead, \
we have a winner! Congratulatin ${second.name}!`);
    }

    if (first.health < second.health) {
        return console.log(`${first.name} loosed as he have less health \
remains than ${second.name}!`);
    }
    else if (first.health > second.health) {
        return console.log(`${second.name} loosed as he have less health \
remains than ${first.name}!`);
    }
    else {return console.log("Spare!");}
};

var bestHit = (obj, enemy, point) => {
    return ("doubleHit" in obj) ? obj.doubleHit(enemy, point): obj.hit(
        enemy, point);
}

  //==================CODE RUN HERE===========================

let bot1 = new Fighter( "Frodo", "1", 100);
let bot2 = new Fighter( "Pedro", "2", 110);
let megaBot1 = new ImprovedFighter("Serious Sam", 3, 120);
let megaBot2 = new ImprovedFighter("Terminator", 4, 130);

fight(bot1, megaBot1, 2, 10, 20);
// fight(bot2, megaBot2, 1, 2, 3, 4, 5, 9);

// console.log(bot1);
// console.log(megaBot1);


//a) - block scoping (let)--------------let damage = point * this.power
//b) - spread / rest operator-----------function fight(fighter, improvedFighter, ...point)
//c) - default settings-----------------constructor (name="Brave Fighter", power=1, health=100)
//d) - string interpolation-------------`${var} text` i used almost evherywhere. My favorite ferature of ES2015!
//e) - arrow functions------------------var bestHit = (obj) => {
//f) - classes + inheritance + super----Done + Done +  super.hit(enemy, point*2)