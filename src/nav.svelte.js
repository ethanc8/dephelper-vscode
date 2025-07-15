export const nav = $state({
  "current_screen": "search",
  "props": {}
});

let screenCallbacks = {};

export function registerScreen(name, callback) {
  screenCallbacks[name] = callback;
}

export function navigateTo(screen, props) {
  nav.current_screen = screen;
  nav.props = props;
  console.log("nav: ");
  console.log(nav);
  console.log("screenCallbacks: ");
  console.log(screenCallbacks);
  screenCallbacks[screen](props);
}
