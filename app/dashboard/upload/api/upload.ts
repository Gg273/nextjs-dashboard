// pages/api/upload.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs/promises';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData = req.body;
      const uploadedFile = formData.file as File;

      // Save the file to a specific directory (e.g., public/uploads)
      const destinationDir = path.join(process.cwd(), 'public/uploads');
      await fs.mkdir(destinationDir, { recursive: true });
      await fs.writeFile(path.join(destinationDir, uploadedFile.name), uploadedFile.data);

      res.status(200).json({ message: 'File uploaded successfully' });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'File upload failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
