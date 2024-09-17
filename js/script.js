const BODY = document.querySelector('body');
const YOUR_FORM = document.querySelector('yourForm');
const DATES_FORM = document.querySelector('datesForm');

const BACKGROUND_COLOR_INPUT = document.getElementById('backgroundColorInput');
const FONT_STYLE_INPUT = document.getElementById('fontStyleInput');

const NAME_INPUT = document.getElementById('nameInput');
const DOB_INPUT = document.getElementById('birthDateInput');
const END_DATE_INPUT = document.getElementById('endDateInput');

const FROM_DATE_INPUT = document.getElementById('fromDateInput');
const TO_DATE_INPUT = document.getElementById('toDateInput');

const CUR_AGE_BUTTON = document.getElementById('calcCurAgeButton');
const AGE_AT_BUTTON = document.getElementById('calcAgeAt');
const TIME_DIFF_BUTTON = document.getElementById('calcTimeDiffButton');

const DISPLAY_YOUR_INFO = document.getElementById('displayYourInfo');
const DISPLAY_OTHER_INFO = document.getElementById('displayOtherInfo');

let NAME = "____";
let DOB = "_/_/_"; let END = "_/_/_";
let FROM = "_/_/_"; let TO = "_/_/_";


BACKGROUND_COLOR_INPUT.addEventListener('input', setBackgroundColor);
FONT_STYLE_INPUT.addEventListener('input', setfontStyle);

CUR_AGE_BUTTON.addEventListener('click', calcCurrentAge);
AGE_AT_BUTTON.addEventListener('click', calcAgeAt);
TIME_DIFF_BUTTON.addEventListener('click', calcDifference);

function setBackgroundColor() {
    // 8B8680 - mid gray
    // console.log(backgroundColorInput.value);
    // let midGray = Number('0x8B8680');
    const CHANGE_COLOR = BACKGROUND_COLOR_INPUT.value.substring(1, 7);
    let midHexDeci = 8388607;

    BODY.style.backgroundColor = BACKGROUND_COLOR_INPUT.value;

    if (Number(`0x${CHANGE_COLOR}`) > midHexDeci) {
        BODY.style.color = "black";
    }
    else {
        BODY.style.color = "white";
    }
}

function setfontStyle() {
    const CHANGE_STYLE = FONT_STYLE_INPUT.value;

    BODY.style.fontFamily = CHANGE_STYLE;
}

function calcTimeDifference(startDate, endDate) {
    const START = Date.parse(startDate);
    const END = Date.parse(endDate);

    const MILLSEC_PER_SEC_PER_DAY = 86_400_000;
    const DAYS_PER_YEAR = 365.25;
    const DAYS_PER_MONTH = 30.5;

    const DIFF_IN_DAYS = (END - START) / MILLSEC_PER_SEC_PER_DAY;
    const CALC_YEARS = Math.floor(DIFF_IN_DAYS / DAYS_PER_YEAR);
    const CALC_MONTHS = Math.floor((DIFF_IN_DAYS - CALC_YEARS * DAYS_PER_YEAR) / DAYS_PER_MONTH);
    const CALC_DAYS = Math.floor(DIFF_IN_DAYS - CALC_YEARS * DAYS_PER_YEAR - CALC_MONTHS * DAYS_PER_MONTH);

    return `about ${CALC_YEARS} years, ${CALC_MONTHS} months, and ${CALC_DAYS} days`;
}

function calcCurrentAge(e) {
    e.preventDefault();

    if (NAME_INPUT.value != "") { NAME = NAME_INPUT.value; }
    if (DOB_INPUT.value != "") { DOB = DOB_INPUT.value; }
    const TODAY = Date();

    const TIME_DIFF = calcTimeDifference(DOB, TODAY);
    const AGE = `${NAME} was born ${TIME_DIFF} ago.`; 

    console.log(AGE);

    DISPLAY_YOUR_INFO.style.display = "block";
    DISPLAY_YOUR_INFO.textContent = AGE;
}

function calcAgeAt(e) {
    e.preventDefault();

    if (NAME_INPUT.value != "") { NAME = NAME_INPUT.value; }
    if (DOB_INPUT.value != "") { DOB = DOB_INPUT.value; }
    if (END_DATE_INPUT.value != "") { END = END_DATE_INPUT.value; }

    const TIME_DIFF = calcTimeDifference(DOB, END);
    const AGE = `On ${END}, ${NAME} was/will be ${TIME_DIFF} old.`; 

    console.log(AGE);

    DISPLAY_YOUR_INFO.textContent = AGE;
    DISPLAY_YOUR_INFO.style.display = "block";
}

function calcDifference(e) {
    e.preventDefault();
    
    if (FROM_DATE_INPUT.value != "") { FROM = FROM_DATE_INPUT.value; }
    if (TO_DATE_INPUT.value != "") { TO = TO_DATE_INPUT.value; }

    const TIME_DIFF = calcTimeDifference(FROM, TO);
    const DIFF = `The difference from ${FROM} to ${TO} is ${TIME_DIFF}.`; 

    console.log(DIFF);

    DISPLAY_OTHER_INFO.textContent = DIFF;
    DISPLAY_OTHER_INFO.style.display = "block";
}