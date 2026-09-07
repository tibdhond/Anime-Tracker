import { CodegenConfig } from "@graphql-codegen/cli";

// This can be any path in your codebase
const rootGQLDirectory = "src/lib/api/__gen__/";
const pluginsDirectory = `${rootGQLDirectory}/plugins`;

const config: CodegenConfig = {
    // can be local or a url
    schema: "https://graphql.anilist.co/",
    // where we are writing all our graphql queries on the frontend
    documents: ["src/lib/api/**/queries.graphql"],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        [rootGQLDirectory]: {
            preset: "client",
        },
        // Integrates graphql-request using codegen.
        // For more plugins check the source
        [`${pluginsDirectory}/graphql-request.ts`]: {
            plugins: ["typescript", "typescript-operations", "typescript-graphql-request"],
        },
    },
};

export default config;