export const onInitialClientRender = () => {
  window.scrollTo(0, 0); // Force le scroll en haut lors du premier rendu
};
// export const onRouteUpdate = ({ location }) => {
//   console.log(location);
//   if (location.pathname == '/') {
//     window.scrollTo(0, 0); // Ramène aussi en haut lors des changements de route
//   }
// };
