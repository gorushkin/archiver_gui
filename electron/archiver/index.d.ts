type Options = {
  archiveName?: string | null;
  password?: string | null;
  level?: string | null;
};

export declare class Archiver {
  static pack(input: string | null, output: string | null, options: Options): void;
}

export declare class ArchiverError extends Error {
  message: string;
  isArchiverError: boolean
}
