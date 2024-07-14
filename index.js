const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const repository = process.env.GITHUB_REPOSITORY
        const authToken = core.getInput('repo-token')
        const octokit = new Octokit({ "auth": authToken })

        const config = JSON.parse(fs.readFileSync('.github/config.json', 'utf8'))

        if (!Object.hasOwnProperty.call(config, 'description')) {
            config.description = ""
        }

        const description = config.description
        const enableDiscussions = config.enable_discussions
        const enableDownloads = config.enable_downloads
        const enableForks = config.enable_forks
        const enableIssues = config.enable_issues
        const enableWiki = config.wiki
        const topics = config.topics

        core.info("Ready to configure ${github_repository}")

        // From https://docs.github.com/en/rest/repos/repos#update-a-repository
        let response = await octokit.request(`PATCH /repos/${repository}`, {
            "description": description,
            "has_wiki": enableWiki
        })
        core.info(`"status", ${response.status}`);
        core.info(`"headers", ${JSON.stringify(response.headers, null, 2)}`);
        core.info(`"data", ${typeof response.data === "object" ? JSON.stringify(response.data, null, 2) : response.data}`);

        core.info("Setting repository topics")
        response = await octokit.request(`PUT /repos/${repository}/topics`, {
            "names": topics
        })
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
