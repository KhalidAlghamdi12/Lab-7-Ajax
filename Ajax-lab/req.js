const apiKey = 'py40ICm8iUWoz00tE8AgkLPOE4JerRxr';

function requestGifsXHR() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            displayGifs(response.data, resultDiv);
        } else if (xhr.readyState === 4 && xhr.status !== 200) {
            console.log(xhr.status + ' Error with the Giphy API: ', xhr.responseText);
        }
    };

    xhr.open('GET', `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}`, true);
    xhr.send();
}

function requestGifsFetch() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch(`https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}`)
        .then(response => response.json())
        .then(data => displayGifs(data.data, resultDiv))
        .catch(error => console.log('Error fetching GIFs:', error));
}

async function requestGifsFetchAsync() {
    const searchInput = document.getElementById('searchInput').value;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayGifs(data.data, resultDiv);
        } else {
            console.log(response.status + ' Error with the Giphy API: ', response.statusText);
        }
    } catch (error) {
        console.log('Error fetching GIFs:', error);
    }
}

function displayGifs(gifs, container) {
    gifs.forEach(gif => {
        const gifItem = document.createElement('div');
        gifItem.className = 'gif-item';

        const imgElem = document.createElement('img');
        imgElem.src = gif.images.fixed_height.url;

        gifItem.appendChild(imgElem);
        container.appendChild(gifItem);
    });
}
