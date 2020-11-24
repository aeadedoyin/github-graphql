// Adedoyin 11/20/2020

// Shorten querySelector
const qS = (selector, all = false) => {
    return all ? document.querySelectorAll(selector) : document.querySelector(selector)
}

// Format date : e.g Aug 20
const shortDate = (strDate) => {
    const d = new Date(strDate)
    const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d)
    const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d)
    return `${mo} ${da}`
}

const graphQLQuery = `{
    user (login: "aeadedoyin") {
        avatarUrl
        name
        login
        bio
        status {
            emojiHTML
            message
        }
        repositories(first: 20, orderBy: {field: CREATED_AT, direction: DESC}) {
            totalCount
            edges {
                node {
                    primaryLanguage {
                        name
                        color
                    }
                    url
                    description
                    updatedAt
                    name
                    stargazerCount
                    forkCount
                }
            }
        }
    }
}`

const repoItemTemplate = ({ name, description, url, primaryLanguage, stargazerCount, forkCount, updatedAt }) => {
    return `
            <div div class= "flex items-start justify-between py-6 border-b" >
                <div class="flex-grow">
                    <h1 class="text-xl font-semibold text-indigo-700 pb-1">
                        <a href="${url}"
                                class="hover:underline" target="_blank">${name}</a>
                    </h1>
                    ${description ? `
                    <div class="pb-4">${description}</div>` : ``}
                    <div class="flex -mx-2">
                        ${primaryLanguage ? `
                        <div class="px-2 flex items-center text-gray-700"><span
                                class="h-3 w-3 rounded-full inline-block"
                                style="background-color: ${primaryLanguage.color};"></span> <span class="ml-1">${primaryLanguage.name}</span>
                        </div>`: ``}
                        <a href="#stargazzers"
                            class="px-2 flex items-center text-gray-700 hover:text-indigo-700">
                            <svg class="octicon octicon-star fill-current" viewBox="0 0 16 16" version="1.1"
                                width="16" height="16" aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                                </path>
                            </svg>
                            <span class="ml-1">${stargazerCount}</span>
                        </a>
                        <a href="#members"
                            class="px-2 flex items-center text-gray-700 hover:text-indigo-700">
                            <svg aria-label="forks" class="octicon octicon-repo-forked fill-current"
                                viewBox="0 0 16 16" version="1.1" width="16" height="16" role="img">
                                <path fill-rule="evenodd"
                                    d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z">
                                </path>
                            </svg>
                            <span class="ml-1">${forkCount}</span>
                        </a>
                        <div class="px-2">${shortDate(updatedAt)}</div>
                    </div>
                </div>
                <div>
                    <a href="#star-${name}"
                        class="bg-transparent flex border rounded-md px-2 py-1 hover:bg-gray-200 items-center text-sm font-semibold">
                        <svg class="octicon octicon-star mr-1" viewBox="0 0 16 16" version="1.1" width="16"
                            height="16" aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z">
                            </path>
                        </svg>
                        <span class="ml-1">Star</span>
                    </a>
                </div>
            </div>
        `
}

// Initializes Github GraphQL API Call
const initGithubGraphQL = () => {
    const url = 'https://api.github.com/graphql'
    const key = 'f9dc8af1190990126f94efa09c243e5db2d02725' // Only allows you view public repo so it's fine 😁
    const header = {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${key}`,
    };

    fetch(url, {
        method: 'POST',
        headers: header,
        body: JSON.stringify({ query: graphQLQuery })
    })
        .then((response) => {
            return response.json()
        })
        .then(({ data }) => {
            updateUI(data)
        })
        .catch((error) => {
            console.log(error)
        })
}
initGithubGraphQL()


const updateUI = ({ user }) => {
    const repoParentElement = qS('#repositories')
    console.log({ user })

    // Set title
    document.title = `${user.login} (${user.name})`

    // Reset repositories UI then update
    repoParentElement.innerHTML = ''
    user.repositories.edges.forEach(repo => {
        repoParentElement.insertAdjacentHTML('beforeend', repoItemTemplate(repo.node));
    });

    // Update user data everywhere
    qS('[data-avatar]', true).forEach(el => {
        el.src = user.avatarUrl
    })
    qS('[data-statusEmoji]', true).forEach(el => {
        if (user.status) {
            el.innerHTML = user.status.emojiHTML
        } else {
            el.parentElement.outerHTML = ''
        }
    })
    qS('[data-statusMessage]', true).forEach(el => {
        if (user.status) {
            el.innerHTML = user.status.message
        } else {
            el.parentElement.outerHTML = ''
        }
    })
    qS('[data-login]', true).forEach(el => {
        el.innerHTML = user.login
    })
    qS('[data-name]', true).forEach(el => {
        el.innerHTML = user.name
    })
    qS('[data-totalRepoCount]', true).forEach(el => {
        el.innerHTML = user.repositories.totalCount
    })
    qS('[data-bio]', true).forEach(el => {
        el.innerHTML = user.bio
    })
}

// Toggle NAV Menu
const toggleNavDropDown = () => {
    qS("#mobileNavDropDown").classList.toggle('flex')
    qS("#mobileNavDropDown").classList.toggle('hidden')
}
// Toggle on click
qS('#navMenuButton').addEventListener('click', toggleNavDropDown)
// Hide on click link within
qS('#mobileNavDropDown a', true).forEach((el) => {
    el.addEventListener('click', () => {
        qS("#mobileNavDropDown").classList.remove('flex')
        qS("#mobileNavDropDown").classList.add('hidden')
    })
})
