const configPackageJsonFromTemplate = (config, template) => {
  const output = {};

  // header
  if (config.component.type === 'package') {
    output.name = `@${config.package.npmScope}/${config.component.name}`;
    output.description = config.component.description;
    output.keywords = config.component.keywords;
    output.repository = `git@github.com:${config.owner.github}/${
      config.component.name
    }.git`; // ASSUME: using GitHub
    output.author = `${config.owner.name} <${config.owner.email}>`;

    if (!config.component.private) {
      output.license = config.package.license || template.license;
      output.publishConfig = {
        access: 'public',
      }; // make it compatible with semantic-release
    } else {
      output.private = true;
    }
  } else {
    output.name = config.component.name; // only attached to make it easy to distinguish files in development
    output.private = true;
  }

  // dependencies
  output.dependencies = template.dependencies;
  output.devDependencies = template.devDependencies;
  output.optionalDependencies = template.optionalDependencies;

  // footer - package only
  if (config.component.type === 'package') {
    output.engines = template.engines;

    if (config.package.environment === 'cli') {
      output.bin = {
        [config.component.name]: 'dist/index.js', // ASSUME: cli built use Babel
      };
    } else {
      output.main = 'dist/index.js';
    }
  }

  return output;
};

export default configPackageJsonFromTemplate;
