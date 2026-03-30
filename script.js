// script.js
let currentVideoIndex = 0;
let videosData = [
    {
        id: 1,
        username: "@dancewithsamer",
        caption: "POV: you finally nail the trend 🔥 #fyp #dance",
        music: "Original sound - SAMER",
        likes: 124800,
        comments: 3421,
        shares: 894,
        videoSrc: "https://test-streams.mux.dev/x264_480p.mp4",
        avatar: "🕺"
    },
    {
        id: 2,
        username: "@samer_saeid",
        caption: "When the beat drops in 2026 👀 #viral #music",
        music: "SOUND - Future TikTok Hit",
        likes: 89200,
        comments: 1245,
        shares: 673,
        videoSrc: "https://test-streams.mux.dev/x264_480p.mp4",
        avatar: "🎤"
    },
    {
        id: 3,
        username: "@techwithsamer",
        caption: "Building the future one line at a time 💻 #coding #fyp",
        music: "lofi beats for coders",
        likes: 45600,
        comments: 892,
        shares: 312,
        videoSrc: "https://test-streams.mux.dev/x264_480p.mp4",
        avatar: "💻"
    },
    {
        id: 4,
        username: "@samer_saeid",
        caption: "Morning routine that changed my life ☕ #morningvibes",
        music: "Original sound - SAMER",
        likes: 231400,
        comments: 5678,
        shares: 1245,
        videoSrc: "https://test-streams.mux.dev/x264_480p.mp4",
        avatar: "☕"
    }
];

let likedVideos = new Set();
let userProfileVideos = [];

$(document).ready(function () {
    console.log('%c🚀 TikTok Web Clone – Fully functional by SAMER SAEID', 'color:#fe2c55; font-weight:bold; font-size:16px;');
    
    loadForYouFeed();
    loadDiscover();
    loadLiveStreams();
    loadMessages();
    loadProfileVideos();
    
    // Intersection Observer for auto-play
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (entry.isIntersecting) {
                video.play().catch(() => {});
                currentVideoIndex = parseInt(entry.target.dataset.index);
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.6 });
    
    // Re-observe after feed loads
    setTimeout(() => {
        document.querySelectorAll('.video-card').forEach(card => observer.observe(card));
    }, 1200);
});

function loadForYouFeed() {
    const container = $('#videoFeed');
    let html = '';
    videosData.forEach((video, index) => {
        const isLiked = likedVideos.has(video.id);
        html += `
        <div class="video-card" data-index="${index}">
            <video loop muted playsinline src="${video.videoSrc}"></video>
            
            <!-- Left overlay -->
            <div class="overlay">
                <div class="d-flex align-items-center mb-2">
                    <span class="me-2 fs-4">${video.avatar}</span>
                    <div>
                        <strong>${video.username}</strong>
                        <button onclick="followUser(this)" class="btn btn-outline-light btn-sm ms-2 rounded-pill px-3 py-0 small">Follow</button>
                    </div>
                </div>
                <p class="mb-1">${video.caption}</p>
                <div class="d-flex align-items-center text-white-50 small music-bar">
                    <i class="bi bi-music-note-beat me-2"></i>
                    ${video.music}
                </div>
            </div>
            
            <!-- Right actions -->
            <div class="right-actions">
                <div onclick="toggleLike(${video.id}, this)" class="action-btn">
                    <i class="bi ${isLiked ? 'bi-heart-fill text-danger' : 'bi-heart'}"></i>
                    <span class="mt-1 small">${(video.likes / 1000).toFixed(1)}K</span>
                </div>
                <div onclick="openComments(${video.id})" class="action-btn">
                    <i class="bi bi-chat-dots"></i>
                    <span class="mt-1 small">${(video.comments / 1000).toFixed(1)}K</span>
                </div>
                <div onclick="shareVideo()" class="action-btn">
                    <i class="bi bi-share"></i>
                    <span class="mt-1 small">${(video.shares / 1000).toFixed(1)}K</span>
                </div>
                <div class="action-btn">
                    <div class="rounded-circle bg-white text-black d-flex align-items-center justify-content-center" style="width:48px;height:48px;font-size:1.4rem;">${video.avatar}</div>
                </div>
            </div>
            
            <!-- Bottom progress hint -->
            <div class="position-absolute bottom-0 start-0 end-0 h-1 bg-gradient" style="background:linear-gradient(90deg,#fe2c55,#00f2ea);"></div>
        </div>`;
    });
    container.html(html);
}

function toggleLike(id, el) {
    if (likedVideos.has(id)) {
        likedVideos.delete(id);
        $(el).find('i').removeClass('bi-heart-fill text-danger').addClass('bi-heart');
    } else {
        likedVideos.add(id);
        $(el).find('i').removeClass('bi-heart').addClass('bi-heart-fill text-danger');
        // Fake increase
        let countEl = $(el).find('span');
        let current = parseFloat(countEl.text());
        countEl.text((current + 1.2).toFixed(1) + 'K');
    }
}

function openComments(id) {
    const video = videosData.find(v => v.id === id);
    $('#commentModal').modal('show');
    $('#commentCount').text(`(${video.comments} comments)`);
    
    const list = $('#commentList');
    list.html(`
        <div class="d-flex mb-3">
            <div class="me-3 fs-4">👾</div>
            <div>
                <strong>@funnycat</strong><br>
                This trend never gets old 😂<br>
                <small class="text-white-50">2h ago</small>
            </div>
        </div>
        <div class="d-flex mb-3">
            <div class="me-3 fs-4">🔥</div>
            <div>
                <strong>@samer_saeid</strong><br>
                Who else is doing this challenge?<br>
                <small class="text-white-50">47m ago</small>
            </div>
        </div>
        <div class="text-center text-white-50 small py-3">Be the first to comment on this video!</div>
    `);
}

function postComment() {
    const input = $('#commentInput').val().trim();
    if (!input) return;
    const list = $('#commentList');
    list.prepend(`
        <div class="d-flex mb-3">
            <div class="me-3 fs-4">👤</div>
            <div>
                <strong>@samer_saeid</strong><br>
                ${input}<br>
                <small class="text-white-50">just now</small>
            </div>
        </div>
    `);
    $('#commentInput').val('');
}

function followUser(btn) {
    if (btn.innerText === 'Follow') {
        btn.innerHTML = 'Following ✅';
        btn.classList.add('bg-success', 'text-white');
        btn.classList.remove('btn-outline-light');
    }
}

function shareVideo() {
    alert('🔗 Link copied to clipboard!\nShare this video on TikTok Web');
}

function loadDiscover() {
    const container = $('#trendingGrid');
    let html = '';
    const trending = [
        { title: "POV: you’re the main character", emoji: "🌟" },
        { title: "AI generated me in 2026", emoji: "🤖" },
        { title: "Silent trend that went viral", emoji: "🤫" },
        { title: "Morning routine hacks", emoji: "☀️" }
    ];
    trending.forEach(t => {
        html += `
        <div onclick="fakeOpenVideo()" class="col-6 col-md-3 text-center">
            <div class="bg-dark rounded-4 overflow-hidden position-relative">
                <div class="ratio ratio-1x1 bg-secondary d-flex align-items-center justify-content-center fs-1">${t.emoji}</div>
                <div class="p-2 small">${t.title}</div>
            </div>
        </div>`;
    });
    container.html(html);
}

function fakeOpenVideo() {
    switchTab(0);
    alert('📱 Video opened in full For You feed');
}

function fakeRecord() {
    alert('🎥 Recording started!\n(Your new video was added to profile)');
    userProfileVideos.unshift({
        id: Date.now(),
        caption: "Just recorded this 🔥",
        likes: 420
    });
    loadProfileVideos();
    switchTab(4);
}

function fakeUpload() {
    alert('📤 Video uploaded successfully!\nIt’s now live in your profile and For You feed.');
    userProfileVideos.unshift({
        id: Date.now(),
        caption: "Uploaded masterpiece",
        likes: 1200
    });
    loadProfileVideos();
    switchTab(4);
}

function loadLiveStreams() {
    const container = $('#liveStreams');
    container.html(`
        <div class="d-flex gap-3 overflow-auto pb-3">
            <div onclick="joinLive()" class="text-center flex-shrink-0">
                <div class="position-relative">
                    <div class="bg-danger rounded-4 p-1">
                        <div class="bg-dark rounded-3 text-center py-3 px-4 fs-3">🔴</div>
                    </div>
                    <span class="badge bg-danger position-absolute top-0 start-0">LIVE</span>
                </div>
                <small class="d-block mt-1">@samerlive</small>
            </div>
            <div onclick="joinLive()" class="text-center flex-shrink-0">
                <div class="bg-success rounded-4 p-1">
                    <div class="bg-dark rounded-3 text-center py-3 px-4 fs-3">🎤</div>
                </div>
                <small class="d-block mt-1">@danceparty</small>
            </div>
        </div>
    `);
}

function joinLive() {
    alert('📡 Joined LIVE stream!\n(Real-time chat would appear here)');
}

function loadMessages() {
    const container = $('#messagesList');
    container.html(`
        <div class="list-group-item bg-dark border-0 d-flex">
            <div class="me-3 fs-3">📨</div>
            <div class="flex-grow-1">
                <strong>New follower request</strong><br>
                <small class="text-white-50">@viralcreator just followed you</small>
            </div>
            <small class="text-white-50">2m</small>
        </div>
        <div class="list-group-item bg-dark border-0 d-flex">
            <div class="me-3 fs-3">💬</div>
            <div class="flex-grow-1">
                <strong>Reply from @samerfan</strong><br>
                <small class="text-white-50">Your last video was fire!!</small>
            </div>
            <small class="text-white-50">14m</small>
        </div>
    `);
}

function loadProfileVideos() {
    const container = $('#profileVideos');
    let html = '';
    userProfileVideos.forEach(v => {
        html += `
        <div class="col-4">
            <div class="bg-dark rounded-3 p-2 text-center">
                <div class="ratio ratio-1x1 bg-secondary rounded-3 d-flex align-items-center justify-content-center fs-1">🎥</div>
                <div class="small mt-2">${v.caption}</div>
                <small class="text-danger">${v.likes} likes</small>
            </div>
        </div>`;
    });
    if (!userProfileVideos.length) {
        html = `<div class="col-12 text-center py-5 text-white-50">Your uploaded videos will appear here</div>`;
    }
    container.html(html);
}

function switchTab(n) {
    $('.tab-panel').removeClass('active');
    $('#tab-' + n).addClass('active');
    
    // Update bottom nav
    $('.bottom-nav .nav-item').removeClass('active');
    $('.bottom-nav .nav-item').eq(n).addClass('active');
    
    if (n === 0) {
        // Refresh feed if needed
    }
}

// Global functions
window.switchTab = switchTab;
window.toggleLike = toggleLike;
window.openComments = openComments;
window.postComment = postComment;
window.followUser = followUser;
window.shareVideo = shareVideo;
window.fakeRecord = fakeRecord;
window.fakeUpload = fakeUpload;
window.joinLive = joinLive;
window.fakeOpenVideo = fakeOpenVideo;
