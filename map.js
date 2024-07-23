function createTaskMap(points) {
    
    const configMap = {
        fullscreenControl: true,
        fullscreenControlOptions: {
            // optional
            title: 'Mappa a schermo completo',
            titleCancel: 'Esci da mappa a schermo completo'
        }
    };

    const taskMap = L.map("taskMapDiv", configMap).setView([0, 0], 13);
    // Add base layers
    const baseLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 19,
            attribution: "",
        }
    ).addTo(taskMap);;
    // mappa ibrida google
    const googleHybrid = L.tileLayer("http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}", {
        maxZoom: 22,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
    })
    // Add layer control
    const baseLayers = L.control
        .layers({
            "Satellite": googleHybrid,
            "Base Map": baseLayer
        })
        .addTo(taskMap);

    const coordinates = [];
    const markerPoints = [];
    // per ogni punto
    let n = 0;
    for (p of points) {
        const point = [p.lat, p.lon];
        coordinates.push(point);
        // marker
        const iconPoint = map_create_fa_marker_icon("fa-solid fa-location-pin", p.name, pointColors[p.points], "#fff", "#000");
        markerPoints[n] = L.marker(point).addTo(taskMap).bindPopup(popupText(p));
        markerPoints[n].setIcon(iconPoint); // aggiorno il marker con la nuova icona
        // cerchio
        L.circle(point, { radius: p.radius, color: pointColors[p.points] }).addTo(taskMap);
        //
        n++;
    }

    taskMap.fitBounds(new L.LatLngBounds(coordinates), {
        padding: [10, 10],
        maxZoom: 10,
    }); // per centrare e autozoomare la mappa (uso i punti reali)
}

// creazione marker generico con icona font awesome e testo passati in input
function map_create_fa_marker_icon(fa, text, iconColor = "green", bgcolor = "#666", textColor = "#ffffff") {
    const htmlMarker = `
        <div style="white-space:nowrap; position: relative;">
            <div style="font-size: 30px; line-height: 0; position: absolute; top: -20px; left: -6px;">
                <i class="${fa}" style="padding: 1px; color: ${iconColor};"></i>
            </div>
            <div style="position: absolute; top: -38px; left: -15px; font-size: 11px;">
                <span style="border-radius: 5px; padding: 1px; border: 0px solid ${textColor}; font-weight: bold; color: ${textColor};">
                    ${text}
                </span>
            </div>
        </div>`;
    const iconPoint = new L.DivIcon({
        html: htmlMarker,
        className: "qboardApp",
    });
    return iconPoint;
}

function popupText(p) {
    let txt = `<div><strong>${p.name}</strong></div>`;
    if (p.points > 0) {
        txt += `<div>Punti: ${p.points}</div>`;
    }
    if (p.start) {
        txt += `<div>Start task</div>`;
    }
    if (p.radius) {
        txt += `<div>Raggio: ${p.radius} metri</div>`;
    }
    if (p.toplanding) {
        txt += `<div>Top landing consentito: ${p.toplandingPoints} punti</div>`;
    }
    return txt;
}