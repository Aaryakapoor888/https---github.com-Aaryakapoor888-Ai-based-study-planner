document.getElementById('studyForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form values
    const subjects = document.getElementById('subjects').value.split(',').map(s => s.trim());
    const studyHours = document.getElementById('studyHours').value;
    const goals = document.getElementById('goals').value;

    // Check if any of the inputs are empty
    if (!subjects.length || !studyHours || !goals) {
        alert('Please fill in all fields.');
        return;
    }

    // Show loading spinner
    document.getElementById('loadingSpinner').classList.remove('hidden');
    document.getElementById('studyPlan').classList.add('hidden');

    try {
        const response = await fetch('/api/plan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                subjects,
                studyHours,
                goals
            })
        });

        // Check if the response is OK (status 200)
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the response as JSON
        const data = await response.json();

        // Update the UI with the received study plan (Example)
        document.getElementById('studyPlan').textContent = JSON.stringify(data, null, 2);
        document.getElementById('studyPlan').classList.remove('hidden');

    } catch (error) {
        console.error('Error submitting study plan:', error);
        alert('There was an error generating the study plan. Please try again later.');
    } finally {
        // Hide the loading spinner
        document.getElementById('loadingSpinner').classList.add('hidden');
    }
});
