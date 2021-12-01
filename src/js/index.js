import "../css/styles.css";
import { App as App_ } from "./core/App"

export const app = function (opts) {
    return new App_(opts)
}
