# Paragliding Task Competition Map

This repository contains an HTML file that displays a map for a paragliding task competition. The map highlights the task's waypoints and provides an overview of the competition rules.

## Competition Rules

### General Rules
- **Free Takeoff:** Pilots can take off from any location.
- **Flexible Timing:** Takeoffs can happen at any time from dawn to dusk.
- **Mandatory Start:** Pilots must begin the task from the designated "Start" point.
- **Waypoint Scoring:** Each waypoint has a unique score based on its difficulty and can only be counted once. The pilot decides the order in which they will reach the waypoints.
- **Landing and Restarting:** If a pilot lands, they are allowed to restart, but they must reach a takeoff point by hiking.

### Scoring System
- **Total Score:** The total score is the sum of points from all visited waypoints.
- **Tie-Breaker:** In case of a tie in total points, the winner is determined by the least amount of time taken from the start point to the final waypoint.

### Categories
- **Open:** This category is open to all pilots.
- **Fun:** This category is for pilots with limited cross-country experience and who are flying gliders with a maximum rating of EN B.

## Getting Started

To view the map and task details, open the `index.html` file in your web browser.

## Repository Structure

- `index.html`: The main HTML file displaying the map and task waypoints.
- `definitions.js`: Contains definitions and constants used in the map and waypoint functions.
- `map.js`: Contains functions for initializing and displaying the map with waypoints.
- `functions.js`: Contains additional utility functions for handling waypoints and other features.
- `waypoints.json`: JSON file containing waypoint data.

## How to Use

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/paragliding-task-competition.git
    ```
2. Open the `index.html` file in your preferred web browser to view the map and task details.

## Customization

### Modifying Waypoints

To modify the waypoints, you need to edit the `waypoints.json` file. Each waypoint object has the following attributes:

- `name`: The name of the waypoint.
- `lat`: Latitude coordinate of the waypoint.
- `lon`: Longitude coordinate of the waypoint.
- `altitude`: Altitude of the waypoint in meters.
- `radius`: The radius of the waypoint's influence area in meters.
- `points`: The score assigned to the waypoint based on its difficulty.
- `toplanding`: A boolean indicating whether top landing is allowed at this waypoint.
- `start`: A boolean indicating whether this waypoint is the start point.

Example of a waypoint object in `waypoints.json`:
```json
{
    "name": "Crocetta", 
    "lat": 45.622708,
    "lon": 10.7843049,
    "altitude": 1500,
    "radius": 600,
    "points": 0,
    "toplanding": false,
    "start": true
}
```

### Modifying Colors

To change the colors used for different waypoints, you can modify the `pointColors` array in the JavaScript files. Each element in the array corresponds to a specific difficulty level. The colors are specified in hexadecimal format.

Example of the `pointColors` array:
```javascript
const pointColors = [
    "#fff",    // Color for 0 points
    "green",   // Color for 1 point
    "yellow",  // Color for 2 points
    "orange",  // Color for 3 points
    "red",     // Color for 4 points
    "blue"     // Additional colors as needed
];
```

## Features

- **Map Display:** The map is displayed using Leaflet, an open-source JavaScript library for mobile-friendly interactive maps.
- **Waypoint Information:** Each waypoint on the map is marked with a pin and includes information such as name, coordinates, radius, points, and whether top landing is allowed.
- **Task Rules:** The rules of the competition are clearly listed for easy reference.
- **Bootstrap Integration:** The layout and styling are enhanced using Bootstrap.
- **Download Button:** A button to download waypoint data as a file.

## External Resources

This project uses the following external resources:
- [Bootstrap](https://getbootstrap.com/) for styling and layout.
- [Leaflet](https://leafletjs.com/) for map display.
- [Leaflet Fullscreen](https://github.com/Leaflet/Leaflet.fullscreen) for full-screen map capability.
- [jQuery](https://jquery.com/) for DOM manipulation.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README according to your specific needs and additional files or features in your repository.
