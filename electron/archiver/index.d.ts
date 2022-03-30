type InputOptions = {
  name?: string | null;
  password?: string | null;
  level?: string | null;
};

type OutputOptions = {
  name?: string | null;
  password?: string | null;
};

export declare class Archiver {
  static pack(input: string | null, output: string | null, options: InputOptions): Promise<string>;
  static unpack(
    input: string | null,
    output: string | null,
    options: OutputOptions
  ): Promise<string>;
}

export declare class ArchiverError extends Error {
  message: string;
  isArchiverError: boolean;
}
