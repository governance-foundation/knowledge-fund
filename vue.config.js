var path = require("path");

module.exports = {
  transpileDependencies: ["vuetify", "vuex-module-decorators", "vuex-persist"],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        directories: {
          buildResources: "build",
        },
        asar: true,
        win: {
          target: "nsis",
        },
        mac: {
          category: "public.app-category.productivity",
        },
        deb: {
          packageCategory: "devel",
        },
      },
      linux: {
        category: "Development",
      },
    },
  },
};
