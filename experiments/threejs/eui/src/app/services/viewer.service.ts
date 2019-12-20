import { Viewer } from "../models/viewer.model";
import { viewerOptions } from "../models/viewer-options.model";

export class ViewerService {
    private viewer: Viewer;

    constructor() {}

    public createInitialViewer(options: viewerOptions) {
        this.viewer = new Viewer(options);
        return this.viewer;
    }

    public getViewer() {
        return this.viewer;
    }
}
