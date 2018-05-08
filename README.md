[![Build Status](https://travis-ci.org/svillegasz/jira-reporter.svg?branch=master)](https://travis-ci.org/svillegasz/jira-reporter)

# PSL - Jira Reporter

## Create a copy of this repo in your github account
### To do this you need to:
> Create a new repo on github with the name you want in blank (do not mark license or readme file)

> Use the command ```git remote rm origin``` to delete the remote on the copy

> Add your remote origin following [How to add remote origin](https://help.github.com/articles/adding-a-remote/)

## Add jira-reports-file.json
### IMPORTANT!
> *Add* your ```jira-reports-file.json``` file. There is a template for that in ```jira-report-template.json``` (if you don't have the ```jira-reports-file.json``` it won't work).

> Add for every day the work you want, the comment and the time

> To know which works are available to report please refer to ```possible-work.json``` if your work is not there please request the admin to add it, if the work is not there, you can add it with the value it has on JIRA

> In ```jira-reports-file.json``` add in the ```project``` property youre proyect as it is on JIRA

> Add as many as sprint weeks you want in ```jira-reports-file.json``` following the convention ```week<num>```

> Add the first day of the sprint (you will only need to do it once) in the property ```firstDayToReportAt``` with the format ```DD/MM/AAAA```

## Setting up Username and Password

> Make sure you have at least [Ruby](http://www.ruby-lang.org/en/downloads/) 1.9.3 (2.0.0 recommended) installed, and then install the travis cli:
```sh
$ gem install travis -v 1.8.8 --no-rdoc --no-ri
```
> In the root of the project run:
```sh
$ travis encrypt JIRA_USERNAME=<your_jira_username> --add
```
> And finally:
```sh
$ travis encrypt JIRA_PASSWORD=<your_jira_password> --add
```

## Setting up the travis cron job
> Follow the travis [getting started guide](https://docs.travis-ci.com/user/getting-started/) and then setup a [cron job](https://docs.travis-ci.com/user/cron-jobs/) to run the project periodically
