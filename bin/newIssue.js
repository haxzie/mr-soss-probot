module.exports = async context => {
    // get the list of all the issues a user created in this repository
    // referred from https://github.com/behaviorbot/new-issue-welcome
    const response = await context.github.issues.getForRepo(context.repo({
        state: 'all',
        creator: context.payload.issue.user.login,
    }));
    const countIssue = response.data.filter(data => !data.pull_request);

    // check if this is the user's first issue in this repository
    if (countIssue.length === 1) {
        try {
            const config = await context.config('config.yml');
            if (config && config.newIssueWelcomeComment) {
                let message = config.newIssueWelcomeComment;
                context.github.issues.createComment(context.issue({
                    body: message
                }));
            }
        } catch (err) {
            if (err.code !== 404) {
                throw err;
            }
        }
    } else {
        // User has previous issues opened/closed in this repository, no need of welcome, it's oua boi!
        let message = config.newIssueComment;
        const issueComment = context.issue({
            body: message
        });
        return context.github.issues.createComment(issueComment)
    }
}