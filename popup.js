document.addEventListener('DOMContentLoaded', function() {
    const now = new Date().toISOString();
  
    const upcomingButton = document.getElementById('upcoming-button');
    const ongoingButton = document.getElementById('ongoing-button');
    const allButton = document.getElementById('all-button');
    const codechefButton = document.getElementById('codechef-button');
    const codeforcesButton = document.getElementById('codeforces-button');
    const atcoderButton = document.getElementById('atcoder-button');
    const leetcodeButton = document.getElementById('leetcode-button');
    const contestsContainer = document.getElementById('contests-container');
    const noContests = document.getElementById('no-contests');
  
    let currentFilter = 'all';
    let currentType = 'upcoming';
    let fetchedContests = [];
  
    // Initialize with default active buttons
    upcomingButton.classList.add('active');
    allButton.classList.add('active');
  
    upcomingButton.addEventListener('click', () => {
      currentType = 'upcoming';
      setActiveButton(upcomingButton, [upcomingButton, ongoingButton]);
      fetchAndDisplayContests(currentType);
    });
  
    ongoingButton.addEventListener('click', () => {
      currentType = 'ongoing';
      setActiveButton(ongoingButton, [upcomingButton, ongoingButton]);
      fetchAndDisplayContests(currentType);
    });
  
    allButton.addEventListener('click', () => {
      currentFilter = 'all';
      setActiveButton(allButton, [allButton, codechefButton, codeforcesButton, atcoderButton, leetcodeButton]);
      displayContests();
    });
  
    codechefButton.addEventListener('click', () => {
      currentFilter = 'codechef.com';
      setActiveButton(codechefButton, [allButton, codechefButton, codeforcesButton, atcoderButton, leetcodeButton]);
      displayContests();
    });
  
    codeforcesButton.addEventListener('click', () => {
      currentFilter = 'codeforces.com';
      setActiveButton(codeforcesButton, [allButton, codechefButton, codeforcesButton, atcoderButton, leetcodeButton]);
      displayContests();
    });
  
    atcoderButton.addEventListener('click', () => {
      currentFilter = 'atcoder.jp';
      setActiveButton(atcoderButton, [allButton, codechefButton, codeforcesButton, atcoderButton, leetcodeButton]);
      displayContests();
    });
  
    leetcodeButton.addEventListener('click', () => {
      currentFilter = 'leetcode.com';
      setActiveButton(leetcodeButton, [allButton, codechefButton, codeforcesButton, atcoderButton, leetcodeButton]);
      displayContests();
    });
  
    function fetchAndDisplayContests(type) {
      contestsContainer.innerHTML = '';
      noContests.style.display = 'none';
  
      let apiUrl = `https://clist.by/api/v4/json/contest/?username=yatin&api_key=e14a8ce4ac95d30a1df6ea2d47b40f70455a913f`;
      if (type === 'upcoming') {
        apiUrl += `&start__gt=${now}`;
      } else if (type === 'ongoing') {
        apiUrl += `&start__lte=${now}&end__gt=${now}`;
      }
  
      apiUrl += `&resource=codeforces.com,codechef.com,atcoder.jp,leetcode.com`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          fetchedContests = data.objects.sort((a, b) => new Date(a.start) - new Date(b.start));
          displayContests();
        })
        .catch(error => console.error('Error fetching contests:', error));
    }
  
    function displayContests() {
      contestsContainer.innerHTML = '';
      noContests.style.display = 'none';
  
      const filteredContests = currentFilter === 'all'
        ? fetchedContests
        : fetchedContests.filter(contest => contest.host.includes(currentFilter));
  
      if (filteredContests.length === 0) {
        noContests.style.display = 'block';
      } else {
        filteredContests.forEach(contest => {
          const contestElement = document.createElement('div');
          contestElement.classList.add('contest', 'box');
          contestElement.innerHTML = `
            <img src="images/${contest.host.split('.')[0]}.png" alt="Logo" class="contest-logo">
            <div class="contest-details">
              <a href="${contest.href}" target="_blank" class="contest-name">${contest.event}</a>
              <div>${formatStartDate(contest.start)}</div>
              <div>${formatDuration(contest.duration)}</div>
              <add-to-calendar-button
                name="${contest.event}"
                options="'Google'"
                location="Online"
                startDate="${new Date(contest.start).toISOString().split('T')[0]}"
                endDate="${new Date(contest.end).toISOString().split('T')[0]}"
                startTime="${new Date(contest.start).toISOString().split('T')[1].substring(0, 5)}"
                endTime="${new Date(contest.end).toISOString().split('T')[1].substring(0, 5)}"
                timeZone="UTC"
              ></add-to-calendar-button>
            </div>
          `;
          contestsContainer.appendChild(contestElement);
        });
      }
    }
  
    function formatStartDate(dateString) {
      const options = { day: '2-digit', month: 'short', year: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString('en-US', options).replace(',', '');
    }
  
    function formatDuration(seconds) {
      const hrs = Math.floor((seconds % (3600*24)) / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const duration = [];
      if (hrs > 0) duration.push(`${hrs} hrs`);
      if (mins > 0) duration.push(`${mins} mins`);
      return duration.join(' ');
    }
  
    function setActiveButton(activeButton, buttonGroup) {
      buttonGroup.forEach(button => button.classList.remove('active'));
      activeButton.classList.add('active');
    }
  
    // Load upcoming contests by default
    fetchAndDisplayContests('upcoming');
  });
  