function fight(fighter, improvedFighter, ...point) {
// This function must initialize battle somehow and call fighters hit functions with point inputs.

};

class Fighter {
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
    doubleHit(enemy, point) {
        return super.hit(enemy, point*2);
    }
};

let f1 = new Fighter( 1, "2",100);
let improved1 = new ImprovedFighter(2,4,200);

console.log(f1);
console.log(improved1);

console.log(f1.hit(improved1,10));
console.log(improved1.hit(f1,10));
console.log(improved1.doubleHit(f1,10));
