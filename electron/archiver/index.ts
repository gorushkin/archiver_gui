import fs from 'fs';
import path from 'path';
import { DefaultSerializer, Serializer, serialize } from 'v8';
import { createGzip, createUnzip, createGunzip, createDeflate } from 'zlib';

class ArchiverError extends Error {
  isArchiverError: boolean;

  constructor(error: string, message: string) {
    super(error);
    this.message = message;
    this.isArchiverError = true;
  }
}

class Archiver {
  private static async validatePath(input: string) {
    try {
      await fs.promises.stat(input);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something wrong';
      throw new ArchiverError(message, `There is no such file or directory ${input}`);
    }
  }

  static pack(input: string, output: string, name: string): void {
    console.log('name: ', name);
    this.validatePath(input);

    const readable = fs.createReadStream(input);
    const writeable = fs.createWriteStream(path.join(output, name));
    const zipStream = createGzip();

    // readable.pipe(zipStream).pipe(writeable);
    // readable.on('readable', () => {
    //   let i = 1;
    //   let data;
    //   while ((data = readable.read(2)) !== null) {
    //     const chunckName = `${name}__${i++}`;
    //     const chunckPath = path.join(output, chunckName);
    //     const writeable = fs.createWriteStream(chunckPath);
    //     writeable.write(data);
    //   }
    // });
    readable.on('data', (chunk) => {
      // console.log(chunk.toString());
      // console.log(serialize(chunk))
    });
  }

  static unpack(input: string, output: string, name: string): void {
    this.validatePath(input);

    const readable = fs.createReadStream(input);
    const writeable = fs.createWriteStream(path.join(output, name));
    const unzipper = createGunzip();

    readable.on('data', (chunk) => {
      // console.log(chunk.toString());
      console.log(serialize(chunk))
      console.log(serialize(chunk).toString())
      console.log(serialize(chunk).toString('hex'))
      // unzipper.write(chunk);

      // unzipper.on('data', (chunk) => {
      //   console.log('chunk: ', chunk.toString());

      //   writeable.write(chunk);
      // });

      // unzipper.on('error', (er) => {
      //   console.log(er);
      // });
    });
  }
}

export { Archiver, ArchiverError };
