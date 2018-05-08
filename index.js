const request = require('request-promise');
const { getIssues, isWorkingDay } = require('./core/report-work');

const USERNAME = process.env.JIRA_USERNAME;
const PASSWORD = process.env.JIRA_PASSWORD;
const URI = 'https://mercurio.psl.com.co/jira/rest/psl-worklog/1.0/psl-worklog';
const auth = {
    user: USERNAME,
    pass: PASSWORD,
};

const postIssues = async () => {
    if (await isWorkingDay()) {
        const issues = await getIssues();
        issues.forEach(async(json) => {
            await request
                .post(URI, { auth, json })
                .then((res) => {
                    console.log('Success!!!')
                })
                .catch((err) => {
                    console.error(`Error: ${err.error.message}`);
                });
        });
    }
}

postIssues();
