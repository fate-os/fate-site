const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreData() {
  try {
    // Find the most recent backup file
    const backupDir = path.join(__dirname, 'backups');
    const files = fs
      .readdirSync(backupDir)
      .filter((file) => file.startsWith('database-backup-') && file.endsWith('.json'))
      .sort()
      .reverse(); // Most recent first

    if (files.length === 0) {
      throw new Error('No backup files found in backups directory');
    }

    const latestBackup = files[0];
    const backupPath = path.join(backupDir, latestBackup);

    console.log(`📁 Loading backup from: ${latestBackup}`);

    // Read and parse the backup file
    const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

    console.log('🔄 Starting data restoration...');

    // Restore data in the correct order (respecting foreign key constraints)
    // 1. First restore quote_parameters (no dependencies)
    if (backupData.quote_parameters && backupData.quote_parameters.length > 0) {
      console.log(`📝 Restoring ${backupData.quote_parameters.length} quote parameters...`);
      for (const param of backupData.quote_parameters) {
        await prisma.quote_parameter.create({
          data: param,
        });
      }
    }

    // 2. Restore users (no dependencies)
    if (backupData.users && backupData.users.length > 0) {
      console.log(`👥 Restoring ${backupData.users.length} users...`);
      for (const user of backupData.users) {
        await prisma.user.create({
          data: user,
        });
      }
    }

    // 3. Restore media (no dependencies)
    if (backupData.media && backupData.media.length > 0) {
      console.log(`📁 Restoring ${backupData.media.length} media files...`);
      for (const media of backupData.media) {
        await prisma.media.create({
          data: media,
        });
      }
    }

    // 4. Restore fate_quotes (depends on quote_parameters)
    if (backupData.fate_quotes && backupData.fate_quotes.length > 0) {
      console.log(`🔮 Restoring ${backupData.fate_quotes.length} fate quotes...`);
      for (const quote of backupData.fate_quotes) {
        await prisma.fate_quote.create({
          data: quote,
        });
      }
    }

    // 5. Restore payment_history (depends on users and fate_quotes)
    if (backupData.payment_history && backupData.payment_history.length > 0) {
      console.log(`💳 Restoring ${backupData.payment_history.length} payment records...`);
      for (const payment of backupData.payment_history) {
        await prisma.payment_history.create({
          data: payment,
        });
      }
    }

    console.log('✅ Data restoration completed successfully!');
    console.log(`📊 Restored data from backup created at: ${backupData.exported_at}`);
  } catch (error) {
    console.error('❌ Error restoring data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the restore
restoreData()
  .then(() => {
    console.log('\n🎉 Data restoration completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Restore failed:', error);
    process.exit(1);
  });
