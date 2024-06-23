document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('lookupForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevents the form from submitting the traditional way
        const name = document.getElementById('name').value.trim();
        resultDiv.classList.add('hidden');  // Hide result div initially
        resultDiv.innerHTML = '<p>Loading...</p>';  // Show loading message

        fetch('data.json')
            .then(response => response.json())  // Parses the JSON data
            .then(data => {
                const person = data.find(p => p.name.toLowerCase() === name.toLowerCase());  // Finds the person in the JSON file
                if (person) {
                    resultDiv.innerHTML = `
                        <p><strong>Name:</strong> ${person.name}</p>
                        <p><strong>Age:</strong> ${person.age}</p>
                        <p><strong>Occupation:</strong> ${person.occupation}</p>
                    `;
                } else {
                    resultDiv.innerHTML = '<p>Person not found.</p>';  // Display message if person is not found
                }
                resultDiv.classList.remove('hidden');  // Show result div
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                resultDiv.innerHTML = '<p>Error loading data. Please try again later.</p>';
                resultDiv.classList.remove('hidden');  // Show result div
            });
    });
});
