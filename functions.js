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

async function wptCreator_wpt() {
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

async function wptCreator() {
    const response = await fetch('/waypoints.json');
    const waypoints = await response.json();
    /*A01016    N 46 03 26.31    E 012 32 53.77   164  ATTERRAGGIO LE MASIERE
    col 1: id
    col 11: latitude
    col 28: longitude
    col 44: altitude
    col 50: name
    */
    let fileContent = "$FormatGEO";
    for (const [k, v] of Object.entries(waypoints)) {
        let wpCode = `W${v.points}`;
        wpCode = wpCode.toString().padEnd(4, '0') + k.toString().padStart(3, '0');
        wpCode = wpCode.toString().padEnd(10, ' ');
        let lat = `N ${deg_to_dms(v.lat)}`;
        lat = lat.toString().padEnd(17, ' ');
        let lon = `E ${deg_to_dms(v.lon)}`;
        lon = lon.toString().padEnd(16, ' ');
        let alt = v.alt;
        alt = alt.toString().padStart(4, ' ');
        fileContent += `\n${wpCode}${lat}${lon}${alt}  ${v.name}`;
    }
    var hiddenElement = document.createElement('a');
    hiddenElement.download = 'waypoints.geo';
    var blob = new Blob([fileContent], {
        type: 'text/plain'
    });
    hiddenElement.href = window.URL.createObjectURL(blob);
    hiddenElement.click();
}

function deg_to_dms(deg) {
    let d = Math.floor(deg);
    d = d.toString().padStart(3, '0');
    let minfloat = (deg-d)*60;
    let m = Math.floor(minfloat);
    m = m.toString().padStart(2, '0');
    let secfloat = (minfloat-m)*60;
    let s = Math.round(secfloat*100)/100;
    if (s==60) {
      m++;
      s=0;
    }
    if (m==60) {
      d++;
      m=0;
    }
    return ("" + d + " " + m + " " + s);
 }