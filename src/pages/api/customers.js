import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
    const dir = path.join(process.cwd(), 'public/images/customers');
    const files = fs.readdirSync(dir);

    const logos = files
        .filter(file => file.endsWith('.png'))
        .map(file => ({
            src: `/images/customers/${file}`,
            alt: file.replace(/\.png$/, '').replace(/[-_]/g, ' '),
        }));

    res.status(200).json(logos);
}
