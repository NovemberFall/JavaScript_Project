const clock = document.getElementsByClassName('clock')[0];

const tick = () => {
    const now = new Date();

    const hr = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();

    const html = `
    <span>${hr}</span> :
    <span>${min}</span> :
    <span>${sec}</span> 
    `;

    clock.innerHTML = html;
};

setInterval(tick, 1000);














// //using date-fns library

// const now = new Date();

// // console.log(dateFns.isToday(now));

// //formatting options
// console.log(dateFns.format(now, 'YYYY'));//2019
// console.log(dateFns.format(now, 'MMMM'));//July
// console.log(dateFns.format(now, 'dddd'));//Friday
// console.log(dateFns.format(now, 'Do'));//26th
// console.log(dateFns.format(now, 'dddd, Do, MMMM, YYYY'));//Friday, 26th, July, 2019


// //comparing dates
// const before = new Date('February 1 2019 12:00:00');
// console.log(before); //Fri Feb 01 2019 12:00:00 GMT-0800 (Pacific Standard Time)

// console.log(dateFns.distanceInWords(now, before));//6 months

// console.log(dateFns.distanceInWords(now, before, { addSuffix: true }));



