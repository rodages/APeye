import { ErrorDialog } from "@codat/orchard-ui";

export function NotFound() {
  return <ErrorDialog statusCode={404} />;
}
