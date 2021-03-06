import fs from 'fs';
import path from 'path';

import { v4 as uuidv4 } from 'uuid';

import { ArchiverError } from './error.js';
import { packTool } from './utils/packTool.js';
import { unpackTool } from './utils/unpackTool.js';

class Archiver {
  static async validateInputPath(input) {
    try {
      await fs.promises.stat(input);
    } catch (error) {
      throw new ArchiverError(error, `no such file or directory ${input}`);
    }
  }

  static async validateOutputPath(output) {
    try {
      await fs.promises.stat(output);
      throw new Error();
    } catch (error) {
      if (error.code === 'ENOENT') return;
      throw new ArchiverError(error, `there is file with ${output} name`);
    }
  }

  static async createTempFolder(output) {
    const tempFolderName = uuidv4();
    const tempOutputpath = path.join(output, tempFolderName);
    try {
      await fs.promises.mkdir(tempOutputpath);
      return tempOutputpath;
    } catch (error) {
      throw new ArchiverError(`Path ${tempOutputpath} is invalid`);
    }
  }

  static async getTagetType(input) {
    try {
      const stat = await fs.promises.stat(input);
      return stat.isFile() ? 'file' : 'directory';
    } catch (error) {
      throw new ArchiverError(error, `no such file or directory ${input}`);
    }
  }

  static async removeTempFolder(folder) {
    await fs.promises.rm(folder, { recursive: true });
  }

  static async unpack(input, output, { password, name: directory }) {
    await this.validateInputPath(input);

    const { name } = path.parse(input);

    const outputPath = path.join(output, directory, name);

    try {
      await unpackTool(input, outputPath, password);
    } catch (error) {
      console.log('error: ', error.message);
      throw new ArchiverError(error);
    }
  }

  static async moveFile(input, output) {
    await fs.promises.rename(input, output);
  }

  static async pack(input, output, { name, password, level = 2 }) {
    await this.validateInputPath(input);
    await this.validateOutputPath(path.join(output, name));

    const targetType = await this.getTagetType(input);

    const tempFolder = await this.createTempFolder(output);
    const tempArchName = path.join(tempFolder, name);
    const tempFilename = path.basename(input);
    const firstArchiveName = await packTool(
      input,
      tempArchName,
      password,
      tempFilename,
      targetType
    );

    if (level === 2) {
      const finalArchName = path.join(output, name);
      const finalFilename = path.basename(finalArchName);
      await packTool(firstArchiveName, finalArchName, password, finalFilename, 'file');
    } else {
      const finalFilename = path.join(output, name);
      await this.moveFile(firstArchiveName, finalFilename);
    }

    await this.removeTempFolder(tempFolder);

    return 'archive was sucessfully packed';
  }
}

export { Archiver, ArchiverError };
