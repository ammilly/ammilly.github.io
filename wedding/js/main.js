window.onload = function() {
    let page1 = document.getElementById('page1'),
    	page2 = document.getElementById('page2'),
    	page3 = document.getElementById('page3'),
    	page4 = document.getElementById('page4'),
    	music = document.getElementById('music'),
    	audio = document.getElementsByTagName('audio')[0];

    //audio

    // music
    music.addEventListener('touchstart', event => {
    	if(audio.paused) {
    		audio.play();
    		music.setAttribute('class', 'play');
    	} else {
    		audio.pause();
    		music.setAttribute('class', '');
    	}
    }, false);

    // page1
    page1.addEventListener('touchstart', event => {
    	page1.style.display  = 'none';
    	page2.style.display = 'block';
    	page3.style.display = 'block';
    	page3.style.top     = '100%';

    	setTimeout(() => {
    		page2.setAttribute('class', 'page fadeOut');
    		page3.setAttribute('class', 'page fadeIn');
    		page4.style.display = 'block';
    		page4.style.top		= '100%';
    		setTimeout(() => {
    			page3.setAttribute('class', 'page fadeOut');
    			page4.setAttribute('class', 'page fadeIn');
    		}, 3000);
    		// page4.setAttribute('class', 'page fadeOut');
    		// page4.style.top		= '100%';
    	}, 5500);
    }, false);
};
