const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log('🔧 Ensuring all settings columns exist in database...');

    try {
        // 1. Verificar tabla settings
        const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'settings'
      );
    `;

        if (!tableExists[0].exists) {
            console.log('⚠️ Table "settings" does not exist. It will be created by the app on first run.');
            return;
        }

        // 2. Agregar todas las columnas necesarias si no existen
        const columns = [
            { name: 'titleColor', type: 'TEXT' },
            { name: 'subtitleColor', type: 'TEXT' },
            { name: 'descriptionColor', type: 'TEXT' },
            { name: 'phoneNumbers', type: 'JSONB' },
            { name: 'phoneNextIndex', type: 'INTEGER', default: '0' }
        ];

        for (const col of columns) {
            try {
                console.log(`📡 Checking column: ${col.name}`);
                const colExists = await prisma.$queryRaw`
          SELECT column_name FROM information_schema.columns 
          WHERE table_name = 'settings' AND column_name = ${col.name}
        `;

                if (colExists.length === 0) {
                    console.log(`➕ Adding column: ${col.name}`);
                    const defaultSql = col.default !== undefined ? ` DEFAULT ${col.default}` : '';
                    await prisma.$executeRawUnsafe(`ALTER TABLE "settings" ADD COLUMN "${col.name}" ${col.type}${defaultSql};`);
                    console.log(`✅ Column ${col.name} added.`);
                } else {
                    console.log(`✔ Column ${col.name} already exists.`);
                }
            } catch (err) {
                console.warn(`⚠️ Error processing column ${col.name}:`, err.message);
            }
        }

        console.log('✨ All columns ensured.');

        // 3. Verificar si existe main_settings
        const settings = await prisma.$queryRaw`SELECT id FROM "settings" WHERE id = 'main_settings'`;
        if (settings.length === 0) {
            console.log('⚠️ main_settings record not found. The app will create it with defaults if needed.');
        } else {
            console.log('✅ main_settings record exists.');
        }

    } catch (error) {
        console.error('❌ Critical error in ensure-columns:', error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
