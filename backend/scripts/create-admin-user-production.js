#!/usr/bin/env node

/**
 * Script para crear un usuario administrador en producción
 * Uso: DATABASE_URL=postgresql://... node create-admin-user-production.js <username> <password> <email> <name>
 * O: node create-admin-user-production.js <username> <password> <email> <name> <databaseUrl>
 */

const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

async function createAdminUser() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('❌ Uso: node create-admin-user-production.js <username> <password> [email] [name] [databaseUrl]');
    console.log('');
    console.log('Ejemplo:');
    console.log('  DATABASE_URL=postgresql://... node create-admin-user-production.js sorteos777 sorteos777 admin@sorteos777.com "Admin Sorteos 777"');
    console.log('  O: node create-admin-user-production.js sorteos777 sorteos777 admin@sorteos777.com "Admin Sorteos 777" "postgresql://..."');
    process.exit(1);
  }

  const username = args[0];
  const password = args[1];
  const email = args[2] || null;
  const name = args[3] || 'Administrador Principal';
  const databaseUrl = args[4] || process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error('❌ Error: DATABASE_URL no proporcionada');
    console.error('   Proporciónala como argumento o como variable de entorno');
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
    console.log('🔐 Creando usuario administrador en producción...');
    console.log(`   Usuario: ${username}`);
    console.log(`   Email: ${email || 'No especificado'}`);
    console.log(`   Nombre: ${name}`);
    console.log(`   Base de datos: ${databaseUrl.split('@')[1] || 'conectada'}`);

    // Verificar si el usuario ya existe
    const existingUser = await prisma.adminUser.findUnique({
      where: { username }
    });

    if (existingUser) {
      console.log('⚠️  El usuario ya existe. Actualizando contraseña...');
      
      // Hashear la nueva contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Actualizar el usuario
      const updatedUser = await prisma.adminUser.update({
        where: { username },
        data: {
          password: hashedPassword,
          email: email || existingUser.email,
          name: name || existingUser.name
        }
      });

      console.log('✅ Usuario actualizado exitosamente!');
      console.log('');
      console.log('📋 Credenciales:');
      console.log(`   Usuario: ${updatedUser.username}`);
      console.log(`   Contraseña: ${password}`);
      return;
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await prisma.adminUser.create({
      data: {
        id: `admin-${Date.now()}`,
        name,
        username,
        email,
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log('✅ Usuario administrador creado exitosamente!');
    console.log('');
    console.log('📋 Credenciales:');
    console.log(`   Usuario: ${user.username}`);
    console.log(`   Contraseña: ${password}`);
    console.log('');
    console.log('🔗 Accede al panel en: https://tu-sitio.netlify.app/#/admin');

  } catch (error) {
    console.error('❌ Error al crear usuario:', error.message);
    if (error.code === 'P2002') {
      console.error('   El usuario ya existe en la base de datos');
    } else if (error.code === 'P1001') {
      console.error('   Error de conexión a la base de datos. Verifica la DATABASE_URL');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

createAdminUser();


