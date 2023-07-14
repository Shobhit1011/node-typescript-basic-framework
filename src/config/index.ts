import convict from "convict";
import * as path from "path";

const config = convict({
  env: {
    doc: "The application environment.",
    format: "*",
    default: "development",
    env: "NODE_ENV",
  },
  port: {
    doc: "The port to bind.",
    format: "port",
    default: 8080,
    env: "PORT",
    arg: "port",
  },
  db: {
    connectionURI: {
      doc: "Database connection string",
      format: "*",
      default: "mongodb://localhost:27017",
    },
    name: {
      doc: "Database name",
      format: String,
      default: "dev_logger",
    },
  },
});

// Load environment dependent configuration
const env = config.get("env");
if (["production", "development", "test"].includes(env)) {
  config.loadFile(path.resolve(__dirname, "./" + env + ".json"));
} else {
  throw new Error(
    `$NODE_ENV must be one of these three values i.e. ["production", "development", "test"]`
  );
}

// Perform validation
config.validate({ allowed: "strict" });
export default config;
