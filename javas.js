function getDetails() {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
  
    if (!from || !to) {
      alert("Please enter both destinations.");
      return;
    }
  
    // Dummy calculation logic (replace with real API later)
    const distance = Math.floor(Math.random() * 3000 + 500); // in km
    const time = (distance / 800).toFixed(1); // assuming avg 800 km/h
    const cost = (distance * 0.12).toFixed(2); // assuming $0.12/km
  
    document.getElementById("results").innerHTML = `
      <p><strong>From:</strong> ${from}</p>
      <p><strong>To:</strong> ${to}</p>
      <p><strong>Distance:</strong> ${distance} km</p>
      <p><strong>Estimated Time:</strong> ${time} hrs</p>
      <p><strong>Estimated Cost:</strong> $${cost}</p>
    `;
  }
  