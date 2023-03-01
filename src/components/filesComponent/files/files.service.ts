import { Injectable } from '@nestjs/common'
import { path } from 'app-root-path'
import { ensureDir, writeFile } from 'fs-extra'
import { extname } from 'path'
import { FileResponse } from './file.interface'

@Injectable()
export class FilesService {
  async saveFiles(
    files: Express.Multer.File[],
    folder: string = 'default',
  ): Promise<FileResponse[]> {
    const uploadFolder = `${path}/uploads/${folder}`
    await ensureDir(uploadFolder)

    const res: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const name = `${Math.random().toString(36).substring(2, 15)}${extname(file.originalname)}`
        await writeFile(`${uploadFolder}/${name}`, file.buffer)
        return {
          url: `/uploads/${folder}/${name}`,
          name,
        }
      }),
    )

    return res
  }
}
