// gets the current local time and updates every 10 seconds
(function () {
    let hours = (new Date).getHours(),
        minutes = (new Date).getMinutes(),
        ampm = (hours >= 12) ? 'pm' : 'am';

    hours = hours % 12;
    hours = (hours > 0) ? hours : 12;

    document.getElementById("time").innerText = `${hours}:${(minutes < 10) ? '0' : ''}${minutes}${ampm}`;
    
    // updates every 10 seconds to have a lighter impact on performance
    setTimeout(arguments.callee, 10 * 1000);
})();