const propName = 'isMoving';

const car = {
    name: 'دنا',
    color: 'سفید',
    year: 0,
    gear: 'دستی',
    usage: '80000km',
    [propName]: true,
    move: function() {

    },
    stop: function() {

    },
    status: {
        doors: 'رنگ شده',
        capoot: 'بی رنگ',
        tires: 'سالم'
    },
    options: ['daylight', 'keyless', 'gps'],
    fullName() {
        return this.name + ' ' + this.color + ' ' + this.gear;
    }
}
console.log(car.fullName())



