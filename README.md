<p align="center">
  <img alt="ncm" src="https://raw.githubusercontent.com/opbi/logo/master/ncm/ncm.svg?sanitize=true" width="160">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@opbi/ncm">
    <img alt="npm" src="https://img.shields.io/npm/v/@opbi/ncm.svg">
  </a>
  <a href="https://travis-ci.org/opbi/ncm">
    <img alt="Travis" src="https://img.shields.io/travis/opbi/ncm/master.svg">
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

<h3 align="center">ncm</h3>
<p align="center">node config manager - create and update dotfiles made easy</p>

---

### Motivation

#### Make Micro-Services Consistent

With the growing amount of toolings and ci services we need to use to create a production-grade codebase, the difficulty of managing configs across multiple repos is increasing. Tools like [lerna](https://github.com/lerna/lerna) is easy to result in a heavy monorepo and doesn't help to manage apps in different teams, plus a lot of Github integrations are optmised on a repo level. `ncm` is created to manage packages (components or apps) in separate repos, keeping the repos light-weight for swift development experience, enjoying the benefits of micro-services while not sacarificing build layer consistency.

#### Best-Practices In Code

`ncm` is built to look after the whole lifecycle of a package (component or app) systematically from creation to development, maintainance and deprecation. We want to make it very easy to create and maintain a production-grade packages. It is built and released following [@opbi/principles](https://github.com/opbi/principles).


### How to Use

#### Install
```shell
yarn add @opbi/ncm -D
```

#### create a new package

```shell
ncm init  # you will be asked a list of questions like `npm init` or `yarn init`
```


#### setup online services
```
cd <package-dir>
ncm setup # it will create github repo, setup .travis pipeline, setup coveralls, scrutinizer, etc..
```

#### update dotfiles
```shell
ncm dotfiles # it will update the common configs according to the latest template
```

#### get development secrets
```shell
ncm dotenv -s <path-of-secrets-in-vault> # it will write secrets in vault to .env file
```

#### configuration override (not supported yet)
`ncm` use [cosmiconfig](https://github.com/davidtheclark/cosmiconfig), and we recommend you to use `.ncmrc.yml` to make repo specific configuration to overwrite certain rules in the common dotfiles from the template. `ncm` will pick up the settings and inject them into the config files based on dotfiles from template.

For example, if you want to use a specific babel-plugin that is not included in the template, then you can add the devDependency, and set `.ncmrc.yml` like the following, `ncm` will then pick up the `settings.babel` and merge it into `.babelrc`, the structure of `settings.babel` would be exactly the same as `.babelrc`, except that it more yamlful.

```yml
---
type: component
settings:
  babel:
    plugins:
      - @babel/plugin-of-your-choice
```


### Inspiration
* [helm](https://github.com/helm/helm)
* [mrm](https://github.com/sapegin/mrm)

### License 
[MIT](License)
