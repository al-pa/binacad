//==================DECLARATION AREA==============================
class Fighter {
  // 1) **Створити класс “Fighter”** -->
  // 2) Клас повиненин приймати значення name, power і health. -->
  // 3) Також клас повинен мати методи “setDamage” та “hit”. -->
  // 4) Метод “setDamage” приймає значення “damage” і наносить урон змінюючи значення health (health = health - damage), і виводить в консоль строку “ health: ”. -->
  // 5) Метод “hit” приймає значення “enemy”, “point”, і в середині викликає метод переданого обекту “enemy.setDamage(damage)”. -->
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
        return `health: ${this.health}`;
    }
    hit(enemy, point) {
        let damage = point * this.power;
        // console.log(`point is ${point}, power is ${this.power} and damage ${damage}`);
        return enemy.setDamage(damage);
    }
};

class ImprovedFighter extends Fighter {
  // 6) **Створити клас ImprovedFighter, який буде наслідуватися від класу Fighter, з його властивостями і методами.** -->
  // 7) Для цього класу створити метод doubleHit, який буде викликати наслідуваний метод “hit”, і передавати туди подвоєне значення “point”. -->
  // 8) Від обох класів породити по екземпляру відповідно fighter, improvedFighter. -->
    doubleHit(enemy, point) {
        return super.hit(enemy, point*2);
    }
};

function fight(fighter, improvedFighter, ...point) {
    console.log(point);
  // This function must initialize battle somehow and call fighters hit functions with point inputs.
  // 11. Ця функція запускатиме процес гри:
  //     a) -Гравці по черзі наносять удар один одному за допомогою методу hit, що приймає відповідне значення point.
  //     b) -Якщо один із них помирає (health = 0), то гра закінчується і результат виводиться в консоль
    (Math.random() < 0.5) ? ([first, second] = arguments) : ([second, first] = arguments);
    //decided who will have 1st turn;

    for(key of point) {
        first.hit(second, key);
            console.log(second.health + second.name);
        if (second.health <= 0) return console.log(`${second.name} is dead, we have a winner! Congratulatin ${first.name}!`);
        second.hit(first, key);
            console.log(first.health + first.name);
        if (first.health <= 0) return console.log(`${first.name} is dead, we have a winner! Congratulatin ${second.name}!`);
    }

    if (first.health < second.health) {
        return console.log(`${first.name} loosed as he have less health remains than ${second.name}!`);
    }
    else if (first.health > second.health) {
        return console.log(`${second.name} loosed as he have less health remains than ${first.name}!`);
    }
    else {return console.log("Spare!");}
};

  // function bestHit(obj) {
  //     ("doubleHit" in obj) ? console.log(true) : console.log(false);
  // }


  //==================CODE RUN HERE===========================


let bot1 = new Fighter( "bot1", "1", 100);
let bot2 = new Fighter( "bot2", "2", 110);
let megaBot1 = new ImprovedFighter("megaBot1", 3, 120);
let megaBot2 = new ImprovedFighter("megaBot2", 4, 130);

fight(bot1, megaBot1, 10, 20, 30);
// console.log(bot1);
// console.log(megaBot1);


