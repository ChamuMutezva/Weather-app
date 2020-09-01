// select the share button with the class 'share-button'
const share = document.querySelector('.share-button');
    // listen to a click event and fire share
    share.addEventListener('click', () => {
        // check if web share is supported
        if (navigator.share) {
            navigator.share({
                // title of what to share
                title: 'Weather App',
                // text to share
                text: 'Live weather and forecast',
                // url to share
                url: 'https://chamumutezva.github.io/Weather-app/',
            })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        } else {
           // console.log(`Web share not supported on desktop...`);
            alert(`Web share not supported on desktop...`);
        }
    })
    