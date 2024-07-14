# github-repository-config-action
A GitHub action to control repository settings through a repo_config.yml file

## Required Permissions

- "Administration" repository permissions (write)

| Key                | Type    | Description                                                  | Default Value |
| ------------------ | ------- | ------------------------------------------------------------ | ------------- |
| description        | string  | A short description of the repository                        | ""            |
| enable_discussions | boolean | Either `true` to enable Discussions or `false` to disable it | `true`        |
| enable_downloads   | boolean | Either `true` to enable downloads or `false` to disable it   | `true`        |
| enable_forks       | boolean | Either `true` to enable forks, or `false` to disable it      | `true`        |
| enable_issues      | boolean | Either `true` to enable the wiki, or `false` to disable it   | `true`        |
| enable_wiki        | boolean | Either `true` to enable the wiki, or `false` to disable it   | `true`        |