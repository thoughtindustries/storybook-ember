import { TransformOptions } from '@babel/core';
import { precompile } from 'ti-ember-templates-loader/ember-template-compiler';

let emberOptions: any;

function precompileWithPlugins(string: string, options: any) {
  const precompileOptions: any = options;
  if (emberOptions && emberOptions.polyfills) {
    precompileOptions.plugins = { ast: emberOptions.polyfills };
  }

  return precompile(string, precompileOptions);
}

export function babel(config: TransformOptions, options: any) {
  if (options && options.presetsList) {
    options.presetsList.forEach((e: any, index: number) => {
      if (e.preset && e.preset.emberOptions) {
        emberOptions = e.preset.emberOptions;
        // eslint-disable-next-line no-param-reassign
        delete options.presetsList[index].preset.emberOptions;
      }
    });
  }

  const babelConfigPlugins = config.plugins || [];

  const extraPlugins = [
    [
      // require.resolve('babel-plugin-htmlbars-inline-precompile'),
      {
        precompile: precompileWithPlugins,
        modules: {
          'ember-cli-htmlbars': 'hbs',
          'ember-cli-htmlbars-inline-precompile': 'default',
          'htmlbars-inline-precompile': 'default',
        },
      },
    ]
    // [require.resolve('babel-plugin-ember-modules-api-polyfill')],
  ];

  return {
    ...config,
    plugins: [].concat(babelConfigPlugins, extraPlugins),
  };
}
