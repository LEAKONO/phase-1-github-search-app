document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById('searchInput').value;
    
    // Call GitHub API to search for users
    const usersResponse = await fetch(`https://api.github.com/search/users?q=${searchInput}`);
    const usersData = await usersResponse.json();
    
    // Display search results
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
    
    usersData.items.forEach(user => {
      const userElement = document.createElement('div');
      userElement.classList.add('user');
      
      const username = document.createElement('p');
      username.textContent = user.login;
      
      const avatar = document.createElement('img');
      avatar.src = user.avatar_url;
      
      const profileLink = document.createElement('a');
      profileLink.href = user.html_url;
      profileLink.textContent = 'View Profile';
      profileLink.target = '_blank';
      
      userElement.appendChild(username);
      userElement.appendChild(avatar);
      userElement.appendChild(profileLink);
      
      userElement.addEventListener('click', async function() {
        // Call GitHub API to get user's repositories
        const reposResponse = await fetch(`https://api.github.com/users/${user.login}/repos`);
        const reposData = await reposResponse.json();
        
        const reposList = document.createElement('ul');
        reposData.forEach(repo => {
          const repoItem = document.createElement('li');
          repoItem.textContent = repo.name;
          reposList.appendChild(repoItem);
        });
        
        // Clear previous search results and display user's repositories
        searchResults.innerHTML = '';
        searchResults.appendChild(reposList);
      });
      
      searchResults.appendChild(userElement);
    });
  });
  