const configPackageJsonFromTemplate = (config, template) => {
  const output = Object.assign({}, template);
  if (config.package.type === 'component') {
    output.name = `@${config.owner.npm}/${config.package.name}`;
    output.description = config.package.description;
    output.keywords = config.package.keywords;

    // cleanup possible fields
    delete output.private;
    delete output.license;
    delete output.publishConfig;
    delete output.main;
    delete output.bin;

    if (!config.package.private) {
      // make it compatible with semantic-release
      output.publishConfig = {
        access: 'public',
      };
      output.license = 'MIT'; // TODO: read license in config
    } else {
      output.private = true;
    }

    if (config.component.environment === 'cli') {
      output.bin = {
        [config.package.name]: 'dist/index.js',
      };
    } else {
      output.main = 'dist/index.js';
    }
  } else {
    delete output.main; // entry point specified in Dockerfile
    delete output.description; // only useful in npm
    delete output.keywords; // only useful in npm
    delete output.engine; // only useful for component
    output.name = config.package.name;
    output.private = true;
  }
  output.repository = `git@github.com:${config.owner.github}/${
    config.package.name
  }.git`;
  output.author = `${config.owner.name} <${config.owner.email}>`;

  return output;
};

export default configPackageJsonFromTemplate;
