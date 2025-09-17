const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportData() {
  try {
    console.log('Starting data export...');

    // Export all tables
    const [users, media, paymentHistory, fateQuotes, quoteParameters] = await Promise.all([
      prisma.user.findMany(),
      prisma.media.findMany(),
      prisma.payment_history.findMany(),
      prisma.fate_quote.findMany(),
      prisma.quote_parameter.findMany(),
    ]);

    const exportData = {
      users,
      media,
      payment_history: paymentHistory,
      fate_quotes: fateQuotes,
      quote_parameters: quoteParameters,
      exported_at: new Date().toISOString(),
    };

    // Create backup directory if it doesn't exist
    const backupDir = path.join(__dirname, 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    // Save to JSON file with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `database-backup-${timestamp}.json`;
    const filepath = path.join(backupDir, filename);

    fs.writeFileSync(filepath, JSON.stringify(exportData, null, 2));

    console.log(`✅ Data exported successfully to: ${filepath}`);
    console.log(
      `📊 Exported ${users.length} users, ${media.length} media files, ${paymentHistory.length} payment records, ${fateQuotes.length} fate quotes, ${quoteParameters.length} quote parameters`
    );

    return filepath;
  } catch (error) {
    console.error('❌ Error exporting data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the export
exportData()
  .then((filepath) => {
    console.log(`\n🎉 Export completed! File saved at: ${filepath}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error('Export failed:', error);
    process.exit(1);
  });
