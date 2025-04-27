function getDetails() {
    const fromInput = document.getElementById("from");
    const toInput = document.getElementById("to");
    const resultsDiv = document.getElementById("results");
  
    const from = formatInput(fromInput.value);
    const to = formatInput(toInput.value);
  
    // Clear previous results
    resultsDiv.innerHTML = "";
  
    // Validation
    if (!from || !to) {
      resultsDiv.innerHTML = `<p style="color: red;">⚠️ Please enter both origin and destination.</p>`;
      return;
    }
  
    // Simulated values
    const distance = getRandomDistance(500, 3500); // in km
    const speed = 800; // average plane speed km/h
    const costPerKm = 0.12;
  
    const time = (distance / speed).toFixed(1); // in hours
    const cost = formatCurrency(distance * costPerKm);
  
    // Encode for URLs
    const fromEncoded = encodeURIComponent(from);
    const toEncoded = encodeURIComponent(to);
  
    // Show results
    resultsDiv.innerHTML = `
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Distance:</strong> ${distance} km</p>
      <p><strong>Estimated Time:</strong> ${time} hours</p>
      <p><strong>Estimated Cost:</strong> ${cost}</p>
      <p><strong>Book Now:</strong></p>
      <ul class="booking-links">
        <li><a href="https://www.makemytrip.com/flights/?itinerary=${fromEncoded}-${toEncoded}-1" target="_blank">MakeMyTrip</a></li>
        <li><a href="https://www.skyscanner.co.in/transport/flights/${fromEncoded}/${toEncoded}" target="_blank">Skyscanner</a></li>
        <li><a href="https://www.cleartrip.com/flights/results?from=${fromEncoded}&to=${toEncoded}" target="_blank">Cleartrip</a></li>
        <li><a href="https://www.expedia.co.in/Flights?trip=oneway&from=${fromEncoded}&to=${toEncoded}" target="_blank">Expedia</a></li>
        <li><a href="https://www.goibibo.com/flights/air-${fromEncoded}-${toEncoded}/" target="_blank">Goibibo</a></li>
      </ul>
    `;
  }
  
  // Helper: Capitalize first letter of each word
  function formatInput(input) {
    return input.trim().replace(/\b\w/g, char => char.toUpperCase());
  }
  
  // Helper: Random distance generator
  function getRandomDistance(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Helper: Format as currency (USD)
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  }
 
const API_KEY = '67cac2e5c485492285f126dc488c6b77'; // <- REPLACE with your key

async function getDetails() {
  const fromInput = document.getElementById("from");
  const toInput = document.getElementById("to");
  const resultsDiv = document.getElementById("results");

  const from = formatInput(fromInput.value);
  const to = formatInput(toInput.value);

  resultsDiv.innerHTML = "";

  if (!from || !to) {
    resultsDiv.innerHTML = `<p style="color: red;">⚠️ Please enter both origin and destination.</p>`;
    return;
  }

  try {
    const [fromCoords, toCoords] = await Promise.all([
      getCoordinates(from),
      getCoordinates(to)
    ]);

    if (!fromCoords || !toCoords) {
      resultsDiv.innerHTML = `<p style="color: red;">❌ Couldn't find one or both cities.</p>`;
      return;
    }

    const distance = haversineDistance(fromCoords, toCoords);
    const speed = 800;
    const costPerKm = 0.12;

    const time = (distance / speed).toFixed(1);
    const cost = formatCurrency(distance * costPerKm);

    const fromEncoded = encodeURIComponent(from);
    const toEncoded = encodeURIComponent(to);

    resultsDiv.innerHTML = `
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Distance:</strong> ${distance.toFixed(2)} km</p>
      <p><strong>Estimated Time:</strong> ${time} hours</p>
      <p><strong>Estimated Cost:</strong> ${cost}</p>
      <p><strong>Book Now:</strong></p>
      <ul class="booking-links">
        <li><a href="https://www.makemytrip.com/flights/?itinerary=${fromEncoded}-${toEncoded}-1" target="_blank">MakeMyTrip</a></li>
        <li><a href="https://www.skyscanner.co.in/transport/flights/${fromEncoded}/${toEncoded}" target="_blank">Skyscanner</a></li>
        <li><a href="https://www.cleartrip.com/flights/results?from=${fromEncoded}&to=${toEncoded}" target="_blank">Cleartrip</a></li>
        <li><a href="https://www.expedia.co.in/Flights?trip=oneway&from=${fromEncoded}&to=${toEncoded}" target="_blank">Expedia</a></li>
        <li><a href="https://www.goibibo.com/flights/air-${fromEncoded}-${toEncoded}/" target="_blank">Goibibo</a></li>
      </ul>
    `;
  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = `<p style="color: red;">🚨 Error occurred. Try again later.</p>`;
  }
}

async function getCoordinates(place) {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(place)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.results && data.results.length > 0) {
    return data.results[0].geometry;
  }
  return null;
}

function haversineDistance(coord1, coord2) {
  const R = 6371;
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value) {
  return value * Math.PI / 180;
}

function formatInput(input) {
  return input.trim().replace(/\b\w/g, char => char.toUpperCase());
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}


  