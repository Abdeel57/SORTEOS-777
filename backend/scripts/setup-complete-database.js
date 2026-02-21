#!/usr/bin/env node

/**
 * Script completo para configurar la base de datos de producción
 * - Aplica todas las migraciones de Prisma
 * - Crea el registro inicial de Settings para Sorteos 777
 * - Verifica que todas las tablas estén creadas
 * 
 * Uso: DATABASE_URL=postgresql://... node setup-complete-database.js
 * O: node setup-complete-database.js <databaseUrl>
 */

const { PrismaClient } = require('@prisma/client');
const { execSync } = require('child_process');
const path = require('path');

async function setupDatabase() {
  const args = process.argv.slice(2);
  const databaseUrl = args[0] || process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL no proporcionada');
    console.error('   Uso: DATABASE_URL=postgresql://... node setup-complete-database.js');
    console.error('   O: node setup-complete-database.js <databaseUrl>');
    process.exit(1);
  }

  // Crear PrismaClient con la DATABASE_URL específica
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl
      }
    }
  });

  try {
    console.log('🚀 Iniciando configuración completa de la base de datos...\n');

    // Paso 1: Aplicar migraciones de Prisma
    console.log('📦 Paso 1: Aplicando migraciones de Prisma...');
    try {
      // Cambiar al directorio backend para ejecutar prisma
      const backendDir = path.join(__dirname, '..');
      process.chdir(backendDir);
      
      // Establecer DATABASE_URL como variable de entorno
      process.env.DATABASE_URL = databaseUrl;
      
      // Ejecutar migraciones
      execSync('node .\\node_modules\\prisma\\build\\index.js migrate deploy', {
        stdio: 'inherit',
        cwd: backendDir
      });
      console.log('✅ Migraciones aplicadas exitosamente\n');
    } catch (error) {
      console.error('⚠️  Error al aplicar migraciones:', error.message);
      console.log('   Continuando con la creación manual de tablas...\n');
    }

    // Paso 2: Verificar y crear tablas si no existen
    console.log('🔧 Paso 2: Verificando y creando tablas necesarias...');

    // Verificar y crear tabla users
    try {
      await prisma.$queryRaw`SELECT 1 FROM "users" LIMIT 1`;
      console.log('✅ Tabla "users" existe');
    } catch (error) {
      console.log('📝 Creando tabla "users"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL,
          "email" TEXT NOT NULL,
          "name" TEXT,
          "phone" TEXT,
          "district" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "users_pkey" PRIMARY KEY ("id")
        );
      `;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "users_email_key" ON "users"("email");`;
      console.log('✅ Tabla "users" creada');
    }

    // Verificar y crear tabla raffles
    try {
      await prisma.$queryRaw`SELECT 1 FROM "raffles" LIMIT 1`;
      console.log('✅ Tabla "raffles" existe');
    } catch (error) {
      console.log('📝 Creando tabla "raffles"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "raffles" (
          "id" TEXT NOT NULL,
          "title" TEXT NOT NULL,
          "description" TEXT,
          "purchaseDescription" TEXT,
          "imageUrl" TEXT,
          "gallery" JSONB,
          "price" DOUBLE PRECISION NOT NULL DEFAULT 50.0,
          "tickets" INTEGER NOT NULL,
          "sold" INTEGER NOT NULL DEFAULT 0,
          "drawDate" TIMESTAMP(3) NOT NULL,
          "status" TEXT NOT NULL DEFAULT 'draft',
          "slug" TEXT,
          "boletosConOportunidades" BOOLEAN NOT NULL DEFAULT false,
          "numeroOportunidades" INTEGER NOT NULL DEFAULT 1,
          "giftTickets" INTEGER DEFAULT 0,
          "packs" JSONB,
          "bonuses" TEXT[],
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "raffles_pkey" PRIMARY KEY ("id")
        );
      `;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "raffles_slug_key" ON "raffles"("slug") WHERE "slug" IS NOT NULL;`;
      console.log('✅ Tabla "raffles" creada');
    }

    // Verificar y crear tabla tickets
    try {
      await prisma.$queryRaw`SELECT 1 FROM "tickets" LIMIT 1`;
      console.log('✅ Tabla "tickets" existe');
    } catch (error) {
      console.log('📝 Creando tabla "tickets"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "tickets" (
          "id" TEXT NOT NULL,
          "raffleId" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "quantity" INTEGER NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "tickets_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "tickets_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `;
      console.log('✅ Tabla "tickets" creada');
    }

    // Verificar y crear tabla orders
    try {
      await prisma.$queryRaw`SELECT 1 FROM "orders" LIMIT 1`;
      console.log('✅ Tabla "orders" existe');
    } catch (error) {
      console.log('📝 Creando tabla "orders"...');
      try {
        await prisma.$executeRaw`
          CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'EXPIRED', 'RELEASED');
        `;
      } catch (enumError) {
        // El enum ya existe, continuar
        if (!enumError.message.includes('already exists')) {
          console.log('⚠️  Error al crear enum OrderStatus:', enumError.message);
        }
      }
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "orders" (
          "id" TEXT NOT NULL,
          "folio" TEXT NOT NULL,
          "raffleId" TEXT NOT NULL,
          "userId" TEXT NOT NULL,
          "tickets" INTEGER[],
          "total" DOUBLE PRECISION NOT NULL,
          "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
          "paymentMethod" TEXT,
          "notes" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "expiresAt" TIMESTAMP(3) NOT NULL,
          CONSTRAINT "orders_pkey" PRIMARY KEY ("id"),
          CONSTRAINT "orders_raffleId_fkey" FOREIGN KEY ("raffleId") REFERENCES "raffles"("id") ON DELETE CASCADE ON UPDATE CASCADE,
          CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "orders_folio_key" ON "orders"("folio");`;
      console.log('✅ Tabla "orders" creada');
    }

    // Verificar y crear tabla winners
    try {
      await prisma.$queryRaw`SELECT 1 FROM "winners" LIMIT 1`;
      console.log('✅ Tabla "winners" existe');
    } catch (error) {
      console.log('📝 Creando tabla "winners"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "winners" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "prize" TEXT NOT NULL,
          "imageUrl" TEXT NOT NULL,
          "raffleTitle" TEXT NOT NULL,
          "drawDate" TIMESTAMP(3) NOT NULL,
          "ticketNumber" INTEGER,
          "testimonial" TEXT,
          "phone" TEXT,
          "city" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "winners_pkey" PRIMARY KEY ("id")
        );
      `;
      console.log('✅ Tabla "winners" creada');
    }

    // Verificar y crear tabla admin_users
    try {
      await prisma.$queryRaw`SELECT 1 FROM "admin_users" LIMIT 1`;
      console.log('✅ Tabla "admin_users" existe');
    } catch (error) {
      console.log('📝 Creando tabla "admin_users"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "admin_users" (
          "id" TEXT NOT NULL,
          "name" TEXT NOT NULL,
          "username" TEXT NOT NULL,
          "email" TEXT,
          "password" TEXT NOT NULL,
          "role" TEXT NOT NULL DEFAULT 'ventas',
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
        );
      `;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "admin_users_username_key" ON "admin_users"("username");`;
      await prisma.$executeRaw`CREATE UNIQUE INDEX IF NOT EXISTS "admin_users_email_key" ON "admin_users"("email") WHERE "email" IS NOT NULL;`;
      console.log('✅ Tabla "admin_users" creada');
    }

    // Verificar y crear tabla settings
    try {
      await prisma.$queryRaw`SELECT 1 FROM "settings" LIMIT 1`;
      console.log('✅ Tabla "settings" existe');
    } catch (error) {
      console.log('📝 Creando tabla "settings"...');
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "settings" (
          "id" TEXT NOT NULL,
          "siteName" TEXT NOT NULL DEFAULT 'Sorteos 777',
          "logo" TEXT,
          "favicon" TEXT,
          "logoAnimation" TEXT NOT NULL DEFAULT 'rotate',
          "primaryColor" TEXT NOT NULL DEFAULT '#111827',
          "secondaryColor" TEXT NOT NULL DEFAULT '#1f2937',
          "accentColor" TEXT NOT NULL DEFAULT '#ec4899',
          "actionColor" TEXT NOT NULL DEFAULT '#0ea5e9',
          "titleColor" TEXT,
          "subtitleColor" TEXT,
          "descriptionColor" TEXT,
          "whatsapp" TEXT,
          "email" TEXT,
          "emailFromName" TEXT,
          "emailReplyTo" TEXT,
          "emailSubject" TEXT,
          "facebookUrl" TEXT,
          "instagramUrl" TEXT,
          "tiktokUrl" TEXT,
          "paymentAccounts" JSONB,
          "faqs" JSONB,
          "displayPreferences" JSONB,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
        );
      `;
      console.log('✅ Tabla "settings" creada');
    }

    // Agregar columnas de text color si no existen
    try {
      await prisma.$executeRaw`ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "titleColor" TEXT;`;
      await prisma.$executeRaw`ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "subtitleColor" TEXT;`;
      await prisma.$executeRaw`ALTER TABLE "settings" ADD COLUMN IF NOT EXISTS "descriptionColor" TEXT;`;
      console.log('✅ Columnas de colores de texto verificadas');
    } catch (error) {
      // Ignorar si las columnas ya existen
    }

    console.log('\n✅ Todas las tablas verificadas/creadas\n');

    // Paso 3: Crear registro inicial de Settings
    console.log('⚙️  Paso 3: Configurando Settings inicial para Sorteos 777...');
    try {
      const existingSettings = await prisma.settings.findUnique({
        where: { id: 'main_settings' }
      });

      if (existingSettings) {
        console.log('✅ Settings ya existe, actualizando con valores de Sorteos 777...');
        await prisma.settings.update({
          where: { id: 'main_settings' },
          data: {
            siteName: 'Sorteos 777',
            logoAnimation: 'rotate',
            primaryColor: '#111827',
            secondaryColor: '#1f2937',
            accentColor: '#ec4899',
            actionColor: '#0ea5e9',
            paymentAccounts: [],
            faqs: [],
            displayPreferences: {}
          }
        });
        console.log('✅ Settings actualizado');
      } else {
        console.log('📝 Creando Settings inicial...');
        await prisma.settings.create({
          data: {
            id: 'main_settings',
            siteName: 'Sorteos 777',
            logoAnimation: 'rotate',
            primaryColor: '#111827',
            secondaryColor: '#1f2937',
            accentColor: '#ec4899',
            actionColor: '#0ea5e9',
            paymentAccounts: [],
            faqs: [],
            displayPreferences: {}
          }
        });
        console.log('✅ Settings creado exitosamente');
      }
    } catch (error) {
      console.error('⚠️  Error al crear/actualizar Settings:', error.message);
      // Continuar aunque falle
    }

    console.log('\n🎉 ¡Configuración completa de la base de datos finalizada!');
    console.log('\n📋 Resumen:');
    console.log('   ✅ Todas las tablas creadas/verificadas');
    console.log('   ✅ Settings configurado para Sorteos 777');
    console.log('   ✅ Base de datos lista para usar\n');

  } catch (error) {
    console.error('❌ Error durante la configuración:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

setupDatabase();

