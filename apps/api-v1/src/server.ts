import { AppConfig } from "@piggy/config";
function main() {
  let a = 1;
  console.log(a);

  const app = AppConfig.getInstance();
  console.log(app.server.apiUrl);
}
main();
