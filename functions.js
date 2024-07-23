function createTaskTable(points) {
    for (p of points) {
        // tabella
        $("#taskTable tbody").append(
            `<tr>
                <td>${p.name}</td>
                <td>${p.lat}</td>
                <td>${p.lon}</td>
                <td>${p.alt}</td>
                <td>${p.radius}</td>
                <td>${p.points}</td>
                <td>${p.toplanding ? p.toplandingPoints : "No"}</th>
                <td>${p.start ? "Si" : "No"}</th>
            </tr>
            `
        );
    }
}

async function wptCreator() {
    const response = await fetch('/waypoints.json');
    const waypoints = await response.json();
    let fileContent = "G  WGS 84";
    fileContent += "\nU  1";
    for (const [k, v] of Object.entries(waypoints)) {
        fileContent += `\nW  W${k} A ${v.lat}N ${v.lon}E 2-JAN-2023 14:30:23 ${v.alt} ${v.name}`;
        fileContent += "\nw Waypoint,,,,,,,,,";
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.download = 'waypoints.wpt';
    var blob = new Blob([fileContent], {
        type: 'text/plain'
    });
    hiddenElement.href = window.URL.createObjectURL(blob);
    hiddenElement.click();
}