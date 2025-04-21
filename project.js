function getDetails() {
    const from = document.getElementById("from").value.trim();
    const to = document.getElementById("to").value.trim();
  
    if (!from || !to) {
      alert("Please enter both destinations.");
      return;
    }
  
    const distance = Math.floor(Math.random() * 3000 + 500); // km
    const time = (distance / 800).toFixed(1); // avg 800 km/h
    const cost = (distance * 0.12).toFixed(2); // $0.12/km
  
  
    const fromEncoded = encodeURIComponent(from);
    const toEncoded = encodeURIComponent(to);
  
    document.getElementById("results").innerHTML = `
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Distance:</strong> ${distance} km</p>
      <p><strong>Estimated Time:</strong> ${time} hrs</p>
      <p><strong>Estimated Cost:</strong> $${cost}</p>
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