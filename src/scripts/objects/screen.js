const screen = {
  userProfile: document.querySelector(".profile-data"),
  renderUser(user) {
    this.userProfile.innerHTML = `
      <div class="info">
        <img src="${user.avatarUrl}" alt="Foto de perfil do usuário"/>
        <div class="data">
          <h1>${user.name ?? "Não possui nome cadastrado"}</h1>
          <p>${user.bio ?? "Não possui bio cadastrada"}</p>
          <div class="follow-info">
            <div class="followers">
              <span>Seguidores</span>
              <p>${user.followers}</p>
            </div>
            <div class="following">
              <span>Seguindo</span>
              <p>${user.following}</p>
            </div>
          </div>
        </div>
      </div> `

    let repositoriesItens = "";
    user.repositories.forEach(
      repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} <br>
                                        ⭐ ${repo.stars} | 🍴 ${repo.forks} | 👀 ${repo.watchers} | 🌐 ${repo.language ?? 'Não definida'}
                                    </a></li>`
    )

    if (user.repositories.length > 0) {
      this.userProfile.innerHTML += `<div class="repositories section">
                                      <h2>Repositórios</h2>
                                      <ul>${repositoriesItens}</ul>
                                    </div>`
    }

    let eventsItens = "";
    user.events.forEach(event => {
      const mensagensFiltradas = event.commits
        .filter(msg => !msg.startsWith("Merge branch"))
        .join("<br>");

      if (mensagensFiltradas) {
        eventsItens += `<li><span>${event.repoName}</span> <br> → ${mensagensFiltradas}</li>`;
      }
    })

    if (user.events.length > 0) {
      this.userProfile.innerHTML += `
        <div class="events section">
          <h2>Eventos</h2>
          <ul>${eventsItens}</ul>
        </div>
      `
    }
  },

  renderNotFound(){
    this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
  }
};

export { screen };
