How to build?
For Development: ionic build
For Staging: ionic build+
For Production: ionic build --configuration production

How to Deploy?
For Development: firebase deploy -P development --only hosting:fibeigreetings-development
For Staging: firebase deploy -P staging --only hosting:fibeigreetings-stage
For Production: firebase deploy -P production --only hosting:fifi-greetings
