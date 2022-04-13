console.log('trgrh');

const maincontent = document.getElementById('main-content');
const header = document.getElementById('head');
const mainnav = document.getElementById('mainnav');
const webtitle = document.getElementById('webtitle');
const aboutlink = document.getElementById('aboutlink');
const submitBtn = document.getElementById('submit');
const logoIcon = document.getElementById('logo-icon');

const items = [mainnav, webtitle, aboutlink];

const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const btn4 = document.getElementById('btn4');
const btn5 = document.getElementById('btn5');
const btn6 = document.getElementById('btn6');
const printBtn = document.getElementById('print');
const homeBtn = document.getElementById('home');

const welcomeSect = document.getElementById('welcome');
const q1Sect = document.getElementById('q1');
const q1aaSect = document.getElementById('q1aa');
const q1aSect = document.getElementById('q1a');
const q2Sect = document.getElementById('q2');
const q3Sect = document.getElementById('q3');
const q4Sect = document.getElementById('q4');
const resSect = document.getElementById('res');

let adults = 0;

let monthly = 0;
let yearly = 0;

let rentmortgage = 0;
let homeutil = 0;
let insurance = 0;
let transportation = 0;
let health = 0;
let food = 0;
let personal = 0;
let savings = 0;
let taxes = 0;
const remaining = document.getElementById('remnants');

let housingTotal = 0;
let personalTotal = 0;

/*
const rentmortgageRes = document.getElementById('rentmortgageres');
const homeutilRes = document.getElementById('homeutilres');
const insuranceRes = document.getElementById('insuranceres');
const transportationRes = document.getElementById('transportationres');
const healthRes = document.getElementById('healthres');
const foodRes = document.getElementById('foodres');
const personalRes = document.getElementById('personalres');
const savingsRes = document.getElementById('savingsres');
*/

const overview = document.getElementById('overview');
const suggestion = document.getElementById('suggestion');
const percentage = document.getElementById('percentage');
const suggestion2 = document.getElementById('suggestion2');

let breakdownInputs = [rentmortgage, homeutil, insurance, transportation, health, food, personal, savings];
//const breakdownOutputs = [rentmortgageRes, homeutilRes, insuranceRes, transportationRes, healthRes, foodRes, personalRes, savingsRes];

const piechartCanvas = document.getElementById('piechart');
const pieNames = ['Rent/Mortgage', 'Home Utilities', 'Insurance', 'Transportation', 'Health', 'Food', 'Personal', 'Savings', 'Taxes'];
const pieColors = ['#800000', '#9A6324', '#808000', '#469990', '#000075', '#4363d8', '#aaffc3', '#dcbeff'];

const loadResults = function(href) {
    const pb = document.getElementById('progress');
    i = 1;
    const load = setInterval(() => {
        pb.style.width = `${i}%`;
        i++;
        if (i == 100) {
            clearInterval(load);
            document.getElementById('done').innerText = "Done!"
            if (href !== undefined) {
                window.location.href = href;
            } else {
                q4Sect.hidden = true;
                resSect.hidden = false;
            }
        }
    }, 7);
}

const calculateTaxes = function() {
    if (adults == 1) {
        if (yearly <= 0) taxes = 0;
        else if (yearly > 0 && yearly <= 9875) taxes = yearly * 0.1;
        else if (yearly > 9875 && yearly <= 40125) taxes = 988 + (0.12 * (yearly - 9875));
        else if (yearly > 40125 && yearly <= 85525) taxes = 4618 + (0.22 * (yearly - 40125));
        else if (yearly > 85525 && yearly <= 163300) taxes = 14606 + (0.24 * (yearly - 85525));
        else if (yearly > 163300 && yearly <= 207350) taxes = 33272 + (0.32 * (yearly - 163300));
        else if (yearly > 207350 && yearly <= 518400) taxes = 47368 + (0.35 * (yearly - 207350));
        else if (yearly > 518400) taxes = 156236 + (0.37 * (yearly - 518400));
    } else if (adults == 2) {
        if (yearly <= 0) taxes = 0;
        else if (yearly > 0 && yearly <= 19750) taxes = yearly * 0.1;
        else if (yearly > 19750 && yearly <= 80250) taxes = 1975 + (0.12 * (yearly - 19750));
        else if (yearly > 80250 && yearly <= 171050) taxes = 9235 + (0.22 * (yearly - 80250));
        else if (yearly > 171050 && yearly <= 326600) taxes = 29211 + (0.24 * (yearly - 171050));
        else if (yearly > 326600 && yearly <= 414700) taxes = 66543 + (0.32 * (yearly - 326600));
        else if (yearly > 414700 && yearly <= 622050) taxes = 94735 + (0.35 * (yearly - 414700));
        else if (yearly > 622050) taxes = 167308 + (0.37 * (yearly - 622050));
    } else {
        taxes = 0;
    }
}

const fetchBreakdownValues = function() {
    monthly = document.getElementById('pay').value * document.querySelector('input[name="freq"]:checked').value * (document.querySelector('input[id="daysperweek"]').value || 1);
    yearly = monthly * 12;
    rentmortgage = document.getElementById('rentmortgage').value;
    homeutil = document.getElementById('homeutil').value;
    insurance = document.getElementById('insurance').value;
    transportation = document.getElementById('transportation').value;
    health = document.getElementById('health').value;
    food = document.getElementById('food').value;
    personal = document.getElementById('personal').value;
    savings = document.getElementById('savings').value;
    housingTotal = rentmortgage + homeutil;
    personalTotal = personal + food;
    breakdownInputs = [rentmortgage, homeutil, insurance, transportation, health, food, personal, savings];
}

document.onkeyup = function() {
    if (!q3Sect.hidden) {
        fetchBreakdownValues();
        calculateTaxes();
        const rawTotal = +rentmortgage + +homeutil + +insurance + +transportation + +health + +food + +personal + +savings;
        const total = monthly - (Math.round(taxes/12)) - rawTotal;
        if (total > 0) remaining.textContent = `You have not accounted for $${total} of your total monthly earnings`;
        else if (total == 0) remaining.textContent = ``;
        else if (total < 0) remaining.textContent = `You have accounted for an additional $${-total}`;
        breakdownOutputs.forEach((output, index) => output.textContent = breakdownInputs[index]);
    }
}

if (window.scrollY >= 100) {
    items.forEach(item => item.classList.add('scrolled'));
}

window.onscroll = function() {
    if (window.scrollY >= 100) {
        if (!mainnav.classList.contains('scrolled')) {
            items.forEach(item => item.classList.add('scrolled'));
        }
        logoIcon.src = '../assets/Help Me Budget-2.svg';
    } else {
        items.forEach(item => item.classList.remove('scrolled'));
        logoIcon.src = '../assets/Help Me Budget.svg';
    }
}

btn1.onclick = function(click) {
    welcomeSect.hidden = true;
    q1Sect.hidden = false;
}

btn2.onclick = function(click) {
    const q1 = document.querySelector('input[name="freq"]:checked');
    if (!q1) return;
    q1Sect.hidden = true;
    if (q1.value == 0) {
        q4Sect.hidden = false;
        loadResults( './results/std.html' );
        return;
    }
    if (q1.value == 4 && q1.id == 'daily') {
        q1aaSect.hidden = false;
        return;
    }
    q1aSect.hidden = false;
}

btn3.onclick = function(click) {
    const q1aa = document.querySelector('input[id="daysperweek"]').value;
    console.log(q1aa);
    if (q1aa == '') return;
    if (q1aa > 7 || q1aa < 1) return;
    q1aaSect.hidden = true;
    q1aSect.hidden = false;
}

btn4.onclick = function(click) {
    const q1a = document.querySelector('input[id="pay"]').value;
    if (q1a == '') return;
    if (q1a < 0) return;
    if (q1a == 10000001) {
        q1aSect.hidden = true;
        q4Sect.hidden = false;
        loadResults('./results/sorich.html');
        return;
    }
    q1aSect.hidden = true;
    q2Sect.hidden = false;
}

btn5.onclick = function(click) {
    adults = document.querySelector('input[id="adultsize"]').value;
    const q2_b = document.querySelector('input[id="childsize"]').value;
    if (adults == '' || q2_b == '') return;
    if (adults < 0 || q2_b < 0) return;
    q2Sect.hidden = true;
    q3Sect.hidden = false;
}

btn6.onclick = function(click) {
    q3Sect.hidden = true;
    q4Sect.hidden = false;
    fetchBreakdownValues();
    new Chart('piechart', {
        type: "pie",
        data: {
            labels: pieNames,
            datasets: [{
                backgroundColor: pieColors,
                data: [...breakdownInputs, Math.round(taxes/12)],
            }]
        },
        options: {
            legend: {
                display: false,
            }
        }
    })
    maincontent.style = "padding: 60px;";
    header.hidden = true;
    if (personalTotal / (monthly || 1) > 0.25) {
        overview.textContent = `Overall, you're doing well!`
        suggestion.textContent = `We see that you’re typically spending `;
        percentage.textContent = `42%`
        suggestion2.textContent = ` on Personal Expenses.
                                Based on recommendations, we recommend that you try to get this down to 15-25%.
                                However, we know that sometimes you can’t reach this, so try to get spending down somewhere else if possible.
                                `;
    }
    loadResults();
    
}

printBtn.onclick = function(click) {
    window.print();
}

homeBtn.onclick = function(click) {
    window.location.replace('index.html');
}