module.exports = app => {
  app.log('Yay, the app was loaded!')

  /**
   * Welcomes the issue creator, sparkles if it's the first time :)
   */
  app.on('issues.opened', async context => {
    const issue = context.payload.issue;
    const creator = issue.user.login;

    // get the list of all the issues a user created in this repository
    // referred from https://github.com/behaviorbot/new-issue-welcome
    const response = await context.github.issues.getForRepo(context.repo({
      state: 'all',
      creator: creator,
    }));
    const countIssue = response.data.filter(data => !data.pull_request);

    // check if this is the user's first issue in this repository
    if (countIssue.length === 1) {
      try {
          context.github.issues.createComment(context.issue({
            body: `Hey @${creator} :wave:, Thanks for opening your first issue! Our maintainers will get back to you in a while :smile:`
          }));
      } catch (err) {
        if (err.code !== 404) {
          throw err;
        }
      }
    } else {
      // User has previous issues opened/closed in this repository, no need of welcome, it's oua boi!
      return context.github.issues.createComment(context.issue({
        body: `Thanks for opening the issue @${creator} , Our maintainers will get back to you in a while :smile:`
      }));
    }
  });

  /**
   * Welcomes the PR creator, sparkles if it's the first time :)
   */
  app.on('pull_request.opened', async context => {
    const pullRequest = context.payload.pull_request;
    let creator = pullRequest.user.login;

    // get the list of all the issues a user created in this repository
    const response = await context.github.issues.getForRepo(context.repo({
      state: 'all',
      creator: creator,
    }));
    const countPullRequest = response.data.filter(data => !data.issue);

    if (countPullRequest.length === 1) {
      try {
        context.github.issues.createComment(context.issue({
          body: `Awesome! Thanks for opening your first Pull Request here @${creator} :heart:
          A maintainer is on his way to review your Pull Request.`
        }));
      } catch (err) {
        if (err.code !== 404) {
          throw err;
        }
      }
    } else {
      // User has previous PRs opened/closed in this repository, no need of welcome, it's oua boi!
      return context.github.issues.createComment(context.issue({
        body: `Hello @${creator}, Thanks for the PR :clap: Have a cup of coffee while a maintainer reviews your changes.`
      }));
    }
  });
}