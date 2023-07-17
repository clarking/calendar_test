
// Array of holiday dates (in "MM-DD" format)
const holidays = ["01-01", "02-05", "03-18", "05-01", "09-16", "11-20", "12-25"];

// Check for holiday
function isHoliday(date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dateStr = `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    console.log(dateStr)
    return holidays.includes(dateStr);
}

function daysInMonth(month, year) {
    let d = new Date(year, month + 1, 0);
    return d.getDate();
}

function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + Number(days));
    return result;
}

function getWeek(date) {
    let week = new Date(date.getFullYear(), 0, 1);
    return Math.ceil((((date - week) / 86400000) + week.getDay() + 1) / 7);
}

function createMonthHeader(table_body, date) {
    let header = document.createElement('tr');
    let cell = document.createElement('th');
    cell.classList.add("text-center")
    cell.textContent = date.toLocaleString('default', { month: 'long' });
    cell.colSpan = 8;
    header.appendChild(cell);
    table_body.appendChild(header);
}

function createCell(text, background) {
    let td = document.createElement('td');
    td.textContent = text;
    td.style.backgroundColor = background;
    td.classList.add('text-center');
    return td;
}

function createWeek(date) {

    let week = document.createElement('tr');
    let currentMonth = date.getMonth();

    // Add week number
    let weekNumberCell = createCell(getWeek(date), "#ebebeb");
    week.appendChild(weekNumberCell);

    let cell;

    // Add empty space before first day of the week
    for (let i = 0; i <= date.getDay() - 1; i++) {
        cell = createCell("", "#ebebeb");
        cell.style.borderTop = 0;
        week.appendChild(cell);
    }

    // Create week row
    for (let i = date.getDay(); i < 7; i++) {

        //Assign color to cell
        if (date.getMonth() === currentMonth) {
            if (date.getDate() <= daysInMonth(date.getMonth(), date.getFullYear())) {
                if (isHoliday(date)) {
                    debugger;
                    cell = createCell(date.getDate(), "#f5bd1e");
                }
                else if (date.getDay() >= 5)
                    cell = createCell(date.getDate(), "#ffe134");
                else
                    cell = createCell(date.getDate(), "#7bb662");
                date.setDate(date.getDate() + 1);
            }
        }
        else {
            cell = createCell("", "#ebebeb");
            cell.style.borderBottom = 0;
        }

        week.appendChild(cell);
    }

    document.getElementById('cal_body').appendChild(week);
    return date;
}

function generateCalendar(startDate, days) {

    let tableBody = document.getElementById('cal_body');
    tableBody.innerHTML = '';

    const endDate = addDays(startDate, days);
    let currentDate = new Date(startDate);

    createMonthHeader(tableBody, currentDate);

    while (currentDate <= endDate) {

        // Add a month header
        if (currentDate.getDate() == 1)
            createMonthHeader(tableBody, currentDate);

        // Create date row
        currentDate = createWeek(currentDate)
    }
}

function updateCalendar() {
    let start = document.getElementById("start_date").value;
    let days = document.getElementById("days_to_show").value;
    generateCalendar(start, days);
}

window.addEventListener('load', function () {
    let today = new Date(Date.now());
    document.getElementById("start_date").value = today.toISOString().substring(0, 10);
    document.getElementById("days_to_show").value = 50;
    document.getElementById("cal_update").addEventListener('click', updateCalendar);
    updateCalendar();
});
