const core = require('@actions/core');
const fs = require('fs');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');

// most @actions toolkit packages have async methods
async function run() {
    try {
        const repository = process.env.GITHUB_REPOSITORY
        const auth_token = core.getInput('repo-token')
        const octokit = new Octokit({ auth: auth_token })

        const config = JSON.parse(fs.readFileSync('.github/config.json', 'utf8'))
        const description = config.description
        const enableIssues = config.issues
        const enableProjects = config.projects
        const enableWiki = config.wiki
        const enableTemplate = config.template
        const defaultBranch = config.default_branch

        core.info("Ready to patch ${github_repository}")

        // From https://docs.github.com/en/rest/repos/repos#update-a-repository
        const response = await octokit.request(`PATCH /repos/${repository}`, { description: description, has_wiki: enableWiki })
        core.info(`"status", ${response.status}`);
        core.info(`"headers", ${JSON.stringify(response.headers, null, 2)}`);
        core.info(`"data", ${typeof response.data === "object" ? JSON.stringify(response.data, null, 2) : response.data}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
