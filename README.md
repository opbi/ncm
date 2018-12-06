<p align="center">
  <img alt="ncm" src="https://raw.githubusercontent.com/opbi/logo/master/ncm/ncm.svg?sanitize=true" width="160">
</p>

<h3 align="center">ncm</h3>
<p align="center" style="margin-bottom: 2em;">node config manager - cross-project config consistency made easy</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@opbi/ncm">
    <img alt="npm" src="https://img.shields.io/npm/v/@opbi/ncm.svg">
  </a>
  <a href="https://circleci.com/gh/opbi/workflows/ncm">
    <img alt="Travis" src="https://img.shields.io/circleci/project/github/opbi/ncm/master.svg">
  </a>
  <a href="https://coveralls.io/github/opbi/ncm?branch=master">
    <img alt="Coveralls" src="https://img.shields.io/coveralls/github/opbi/ncm/master.svg">
  </a>
  <a href="https://github.com/semantic-release/semantic-release">
    <img alt="semantic-release" src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg">
  </a>
</p>

<p align="center">
  <a href="https://snyk.io/test/github/opbi/ncm">
    <img alt="Known Vulnerabilities" src="https://snyk.io/test/github/opbi/ncm/badge.svg">
  </a>
  <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fopbi%2Fncm?ref=badge_shield">
    <img alt="License Scan" src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fopbi%2Fncm.svg?type=shield"/>
  </a>
  <a href="https://david-dm.org/opbi/ncm">
    <img alt="Dependencies" src="https://img.shields.io/david/opbi/ncm.svg">
  </a>
  <a href="https://david-dm.org/opbi/ncm?type=dev">
    <img alt="devDependencies" src="https://img.shields.io/david/dev/opbi/ncm.svg">
  </a>
  <a href="https://scrutinizer-ci.com/g/opbi/ncm/?branch=master">
    <img alt="Scrutinizer Code Quality" src="https://img.shields.io/scrutinizer/g/opbi/ncm.svg">
  </a>
</p>

---

### Motivation

#### Make Micro-Services Consistent

With the growing amount of toolings and ci services we need to use to create a production-grade codebase, the difficulty of managing configs across multiple repos is increasing. Tools like [lerna](https://github.com/lerna/lerna) is easy to result in a heavy monorepo and doesn't help to manage apps in different teams, plus a lot of Github integrations are optmised on a repo level. `ncm` is created to manage packages (components or apps) in separate repos, keeping the repos light-weight for swift development experience, enjoying the benefits of micro-services while not sacarificing build layer consistency.

#### Best-Practices In Code

`ncm` is built to look after the whole lifecycle of a package (component or app) systematically from creation to development, maintainance and deprecation. We want to make it very easy to create and maintain a production-grade packages. It is built and released following [@opbi/principles](https://github.com/opbi/opbi#principles).


### Prerequisite

#### Access Tokens

#### Glossary

We use `component` to refer to a complete codebase unit that serves a specific function in a micro-service system, which could be in the type of [app, service, job, package, etc.] and cover the scope of project management, code repo, published/deployed entity and all related service resources. For more details, please refer to [@opbi/glossary](https://github.com/opbi/opbi#glossary).

### How to Use

#### Install
```shell
yarn add @opbi/ncm -D
```

#### Setup New Component

```shell
ncm init  # you will be asked a list of questions like `npm init` or `yarn init`
# check .ncmrc.yml, add more details if necessary
ncm setup # it will create dotfiles based on preset and custom config as well as create GitHub repo
make install
# all set, start development 🎉
```
Currently it needs manual clicks to setup project in CI and code quality reports, this can be automated by running a worker triggered by GitHub hook.

#### Use Custom Template Repo
By default, `ncm` uses ncm-preset-[component.type] as the config file template, which is a repo that is constantly being updated and tested to maintain fresh high-quality build config standards. In case you prefer use your own preset, you just need to add your Github repo to `.ncmrc.yml` under `component.template`.

```yml
---
component:
  type: package # [package, service, app, job]
  template: opbi/ncm-preset-package  # default to this repo for [package]
```

#### Update Config Files
```shell
ncm config # it will replace the dotfiles with latest ones from the template
```

#### Fetch Dotenv Secrets
```shell
ncm .env -s <path-of-secrets-in-vault> # it will write secrets in vault to .env file
```

#### Develop A Component [TODO]
As `ncm` is created to manage the whole lifecycle of a component in microservice system, workflow automation is included in the scope. Workflow logics over lifecycles of different types of components defined in [@opbi/practices](https://github.com/opbi/opbi#practices) would be materialised as automation in `ncm`. For example, when the following command in a package component, it would move the Trello card to development stage, create a new branch with preset naming convention, open a PR, link the PR to the Trello Card.

```shell
ncm start #TrelloCard
```

#### Repo Specific Config [TODO]
Add repo specific configuration to `.ncmrc.yml` to overwrite certain rules in the common dotfiles from the template. `ncm` will pick up the settings and inject them into the config files based on dotfiles from template.

For example, if you want to use a specific babel-plugin that is not included in the template, then you can add the devDependency, and set `.ncmrc.yml` like the following, `ncm` will then pick up the `config.babel` and merge it into `babel.config.js`, the structure of `config.babel` would be exactly the same as `.babelrc`, except that it more yamlful.

```yml
---
component:
  type: package
config:
  babel:
    plugins:
      - @babel/plugin-of-your-choice
  gitbook:
    disabled: true
```

#### Rename A Component [TODO]
```
ncm rename # this would rename the dir, GitHub Repo, package.json, deployment service, etc.
```

#### Archive A Component [TODO]
```shell
ncm archive # this will archive the repo, teardown all services, deprecate component/service/app
```

### Inspiration
* [helm](https://github.com/helm/helm)
* [mrm](https://github.com/sapegin/mrm)
* [kyt](https://github.com/NYTimes/kyt/)
* [yarn](https://github.com/yarnpkg/yarn)

### License 
[MIT](License)
