var _templateObject;

function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
}

import App from 'app';
App.reopen({ Router: false });

import global from 'global';
import dedent from 'ts-dedent';
var rootEl = global.document.getElementById('root');

var app = App.create({
  rootElement: '#lms',
  modulePrefix: 'lms'
});
var hasRendered = false;
var isRendering = false;

let i = 0;
function render(options, el) {
  if (isRendering) return;
  isRendering = true;
  var template = options.template,
    _options$context = options.context,
    context = _options$context === void 0 ? {} : _options$context,
    element = options.element;

  if (hasRendered) {
    rootEl.innerText = '';
  }

  console.log('options', options);

  app.then(() => {
    i++;
    app.register(
      `component:story-mode-${i}`,
      Ember.Component.extend(
        Object.assign(
          {
            layout: template || options
          },
          context
        )
      )
    );

    var component = app.__container__.lookup(`component:story-mode-${i}`);

    if (element) {
      component.appendTo(element);
      element.appendTo(el);
    } else {
      component.appendTo(el);
    }

    hasRendered = true;
    isRendering = false;
  });
}

export default function renderMain(_ref) {
  var storyFn = _ref.storyFn,
    kind = _ref.kind,
    name = _ref.name,
    showMain = _ref.showMain,
    showError = _ref.showError;
  var element = storyFn();

  if (!element) {
    showError({
      title: 'Expecting a Ember element from the story: "'
        .concat(name, '" of "')
        .concat(kind, '".'),
      description: dedent(
        _templateObject ||
          (_templateObject = _taggedTemplateLiteral(
            [
              '\n        Did you forget to return the Ember element from the story?\n        Use "() => hbs(\'{{component}}\')" or "() => { return {\n          template: hbs`{{component}}`\n        } }" when defining the story.\n      '
            ],
            [
              '\n        Did you forget to return the Ember element from the story?\n        Use "() => hbs(\'{{component}}\')" or "() => { return {\n          template: hbs\\`{{component}}\\`\n        } }" when defining the story.\n      '
            ]
          ))
      )
    });
    return;
  }

  showMain();
  render(element, rootEl);
}
