import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { Transform } from 'stream';
import csvParser from 'csv-parser';
import sequelize from '../database';

import User from '../database/models/User';

export async function processCsv(filePath: string): Promise<void> {
    const transformStream = new Transform({
        objectMode: true,
        highWaterMark: 10,
        async transform(row, encoding, callback) {
            const transaction = await sequelize.transaction();

            try {

                // we might doe some valdatoin here before we procced ... 

                const exists = await User.findOne({ where: { id: row.id }, transaction });
                if (exists) {
                    console.log(`Row already processed: ${row.id}`);
                    callback(null, row);
                    await transaction.rollback();
                    return;
                }

                await User.create({ id:row.id, name: row.name, age: row.age  }, { transaction });
                // const m = JSON.stringify(row)
                console.log(`Saved row:`, row);

                await transaction.commit();

                callback(null, row);
            } catch (error) {
                // lets hnadle the failures 
                console.error(`Error saving row:`, error);
                callback(null, error);
            }
        },
    });

    try {
        await pipeline(
            createReadStream(filePath), // let's handle back pressure 
            csvParser(),
            transformStream
        );
        console.log(`Finished processing: ${filePath}`);
    } catch (error) {
        console.error(`Error processing file ${filePath}:`, error);
    }
}