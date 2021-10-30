import { IdManager } from "../interfaces/idManager";
/**
 * Service providing the Red Hat anonymous user id, read/stored from the `~/.redhat/anonymousId` file.
 */
export declare class FileSystemIdManager implements IdManager {
    getRedHatUUID(): Promise<string>;
}
//# sourceMappingURL=fileSystemIdManager.d.ts.map