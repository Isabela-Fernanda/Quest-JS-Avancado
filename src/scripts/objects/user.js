const user = {
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: '',
    following: '',
    repositories: [],
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories.map(repo => ({
            name: repo.name,
            html_url: repo.html_url,
            forks: repo.forks_count,
            stars: repo.stargazers_count,
            watchers: repo.watchers_count,
            language: repo.language
        }));

    },
    setEvents(events) {
        const pushEvents = events.filter(event => event.type === "PushEvent");
        const createEvents = events.filter(event => event.type === "CreateEvent");

        const formattedPushEvents = pushEvents.map(event => ({
            repoName: event.repo.name,
            commits: event.payload.commits.map(commit => commit.message)
        }));

        const formattedCreateEvents = createEvents.map(event => ({
            repoName: event.repo.name,
            commits: ['Sem mensagem de commit']
        }));

        this.events = [...formattedPushEvents, ...formattedCreateEvents];
    },
}

export { user }