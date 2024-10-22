async function fetchSpreadsheetData() {
    const response = await fetch('https://main--ravisite--que22186.aem.page/multipagespreadsheet.json');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

async function renderData() {
    const container = document.querySelector('.custom-block'); // Replace with your AEM block's selector
    container.innerHTML = ''; // Clear existing content

    try {
        const data = await fetchSpreadsheetData();

        if (Array.isArray(data) && data.length) {
            const ul = document.createElement('ul');

            data.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.name || item.value; // Adjust based on your data structure
                ul.appendChild(li);
            });

            container.appendChild(ul);
        } else {
            const errorMessage = document.createElement('p');
            errorMessage.textContent = 'No data available.';
            container.appendChild(errorMessage);
        }
    } catch (error) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = `Error: ${error.message}`;
        container.appendChild(errorMessage);
    }
}

// Call renderData when the window loads
window.onload = renderData;
