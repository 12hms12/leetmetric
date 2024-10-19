document.addEventListener("DOMContentLoaded", function () {
    const searchBtn = document.getElementById("search_button"); // No # in getElementById
    const usernameInput = document.getElementById("user_input"); // No # in getElementById

    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy_progress");
    const mediumProgressCircle = document.querySelector(".medium_progress");
    const hardProgressCircle = document.querySelector(".hard_progress");

    const easyLabel = document.getElementById("easy_label"); // No # in getElementById
    const mediumLabel = document.getElementById("medium_label"); // No # in getElementById
    const hardLabel = document.getElementById("hard_label"); // No # in getElementById
    const cardStatsContainer = document.querySelector(".stats-cards");

    // Ensure these elements exist before proceeding
    if (!searchBtn || !usernameInput || !statsContainer) {
        console.error("Critical elements are missing from the DOM");
        return;
    }

    // Function to validate username format
    function validateUsername(username) {
        if (username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if (!isMatching) alert("Username is invalid");
        return isMatching;
    }

    // Fetch user details from LeetCode API
    async function fetchUserDetails(username) {
        const targetUrl = `https://leetcode-stats-api.herokuapp.com/${username}`; 
        try {
            searchBtn.textContent = "Searching...";
            searchBtn.disabled = true;
            const response = await fetch(targetUrl);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const data = await response.json();
            console.log("Fetched data: ", data);
            updateStats(data)

        } catch (error) {
            console.error(error);
            alert("An error occurred while fetching user details.");
        } finally {
            searchBtn.textContent = "Search";
            searchBtn.disabled = false;
        }
    }

    function updateStats(data) {
        const totalSolved = data.totalSolved;
        const totalQuestions = data.totalQuestions;
        
        const easySolved = data.easySolved;
        const mediumSolved = data.mediumSolved;
        const hardSolved = data.hardSolved;
    
        const totalEasy = data.totalEasy;
        const totalMedium = data.totalMedium;
        const totalHard = data.totalHard;
    
        const easyPercent = (easySolved / totalEasy) * 100;
        const mediumPercent = (mediumSolved / totalMedium) * 100;
        const hardPercent = (hardSolved / totalHard) * 100;
    
        easyLabel.textContent = `${easySolved} out of ${totalEasy}`;
        mediumLabel.textContent =  `${mediumSolved} out of ${totalMedium}`;
        hardLabel.textContent = `${hardSolved} out of ${totalHard}`;
    
        // Calculate degrees for conic gradient (100% equals 360 degrees)
        easyProgressCircle.style.setProperty('--progress-degree', `${easyPercent * 3.6}deg`);
        mediumProgressCircle.style.setProperty('--progress-degree', `${mediumPercent * 3.6}deg`);
        hardProgressCircle.style.setProperty('--progress-degree', `${hardPercent * 3.6}deg`);
    
        statsContainer.style.display = 'block';
    }
    

    // Event listener for the search button
    searchBtn.addEventListener('click', function () {
        const username = usernameInput.value.trim();
        console.log("Username: ", username);
        if (validateUsername(username)) {
            fetchUserDetails(username);
        }
    });
});
