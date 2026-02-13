import next from "eslint-config-next";

export default [
  ...next,
  {
    settings: {
      "import/resolver": {
        typescript: {
          project: true,
        },
      },
    },
  },
];