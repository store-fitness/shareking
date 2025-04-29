
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // Créer la page d'accueil (index)
  createPage({
    path: '/', // L'URL de la page
    component: require.resolve('./src/pages/index.js'), // Le template à utiliser
    context: {}, // Tu peux passer des données ici si nécessaire
  });
};