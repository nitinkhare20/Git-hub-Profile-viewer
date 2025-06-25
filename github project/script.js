function getGitHubProfile() {
  const username = document.getElementById('username').value;
  const profileDiv = document.getElementById('profile');

  if (!username) {
    profileDiv.innerHTML = "<p>Please enter a GitHub username.</p>";
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then(res => {
      if (!res.ok) throw new Error("User not found");
      return res.json();
    })
    .then(data => {
      profileDiv.innerHTML = `
        <img src="${data.avatar_url}" alt="${data.login}" />
        <h2>${data.name || data.login}</h2>
        <p>${data.bio || 'No bio available'}</p>
        <p>Repos: ${data.public_repos} | Followers: ${data.followers}</p>
        <a href="${data.html_url}" target="_blank">View Profile</a>
      `;
    })
    .catch(error => {
      profileDiv.innerHTML = `<p>User not found. Try again.</p>`;
    });
}
