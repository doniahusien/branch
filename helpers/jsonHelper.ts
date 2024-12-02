import fs from 'fs';

export class JsonHelper {
  static read<T>(filePath: string): T {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  }

  static write<T>(filePath: string, data: T): void {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
}