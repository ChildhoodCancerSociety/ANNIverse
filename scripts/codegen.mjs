/**
 *
 * @param {import('plop').NodePlopAPI} plop
 */
export default function plop(plop) {
  plop.setGenerator("resource", {
    description: "build boilerplate for new db resource",
    prompts: [
      {
        type: "input",
        name: "Name",
        message: "Resource name",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/server/api/routers/{{name}}.queries.ts",
      },
      {
        type: "add",
        path: "src/server/api/routers/{{name}}.mutations.ts",
      },
      {
        type: "add",
        path: "src/server/api/routers/{{name}}.validators.ts",
      },
    ],
  });

  plop.setGenerator("component", {});

  plop.setGenerator("atom", {});

  plop.setGenerator("hook", {});

  plop.setGenerator("page", {});
}
