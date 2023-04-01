declare module "sharp-multer" {
    import { DiskStorageOptions, FileFilterCallback, Request } from "multer";
    import sharp, { Sharp } from "sharp";
  
    export function memoryStorage(
      options?: (req: Request, file: Express.Multer.File, cb: (error: Error | null, info: Partial<sharp.Metadata>) => void) => void
    ): DiskStorageOptions;
  
    export function diskStorage(
      options: DiskStorageOptions
    ): {
      _handleFile: (
        req: Request,
        file: Express.Multer.File,
        callback: (error?: Error | null, info?: Partial<sharp.Metadata>) => void
      ) => void;
      _removeFile: (req: Request, file: Express.Multer.File, callback: (error: Error) => void) => void;
    };
  
    export function filterFile(
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback
    ): void;
  
    export type SharpTransformer = (sharp: Sharp) => Sharp;
  
    export interface SharpMulterOptions extends DiskStorageOptions {
      transformer?: SharpTransformer;
    }
  
    export function sharp(options?: SharpMulterOptions): any;
  }