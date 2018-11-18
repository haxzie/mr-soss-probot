module.expport = async context => {
    context.log("PR opened");
    let prNumber = context.issue().number;

    let prMessage = "Hey there :wave: Thanks for the PR! \n";
    prMessage += "Here\'s the link for the [deploy preview](https://deploy-preview-" + prNumber + "--sosc.netlify.com/) of the changes. \n";
    prMessage += "Deploy preview will be available in a while if the changes didn\'t break anything. ";
    prMessage += "Fingers crossed :crossed_fingers:";

    const prComment = context.issue({
        body: prMessage
    });
    return context.github.issues.createComment(prComment);
}