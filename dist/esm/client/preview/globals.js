import global from 'global';
var globalWindow = global.window;
globalWindow.STORYBOOK_NAME = process.env.STORYBOOK_NAME;
globalWindow.STORYBOOK_ENV = 'ember';