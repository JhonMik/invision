# NZFE

### Versioning

`[major release].[current iteration].[build on current iteration]`

### Development

#### Branches & Environments
- `develop`: features and bug fixes that are to be deployed in the next build, hosted in a non-live data environment
- `master`: code base with the latest released items, deployed to a live data environment

#### Contribution Guide

- All code changes assigned to a contributor should be performed on a light-weight branch named such as `fix-contact-form`
- Once an issue is completed, input the amount of time it took to complete on the issue tracker
- Once the issues/features is ready to be committed in, commit using a format such as below as [detailed here](https://docs.ghost.org/docs/git-workflow#section-notes-on-writing-good-commit-messages)
````
Fix issues with incomplete contact items

closes #292
- Remove repeated fields
- Align Contact UI items to fit view
````

#### Code Quality
Given the level of OCD that we almost _encourage_ on our team, it is mandatory that all contributors use [editorconfig](http://editorconfig.org/) for the editors/IDEs of their choice.
If PRs do not conform to the standards laid out in `.editorconfig`, they may be rejected. Discussions on the standards are welcome but **2 spaces and no tabs** is not up for debate. 

#### Stack
- MongoDB
- NodeJS
- VueJS
- SaSS

#### Conventions

#### Local Setup
1. Install MongoDB and start an instance at localhost:27017
2. Clone the codebase
3. Run `npm install -g yarn && yarn`
4. Then run `npm run client:dev` & `npm run server:dev` on seperate terminals

#### Codebase Structure

````
client: VueJS application
server: NodeJS application
````

### Deployment
