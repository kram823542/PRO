import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// ✅ .env file direct load karega (bina kisi path error ke)
dotenv.config(); 

const runCleanup = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ ERROR: MONGODB_URI nahi mila. Check karo ki .env file backend folder me hai ya nahi.');
      process.exit(1);
    }

    await mongoose.connect(mongoURI);
    console.log('✅ Connected to Database...');

    const db = mongoose.connection.db;

    // ✅ Backup folder create karo
    const backupDir = path.join(process.cwd(), 'database_backup');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFolder = path.join(backupDir, `backup_${timestamp}`);
    fs.mkdirSync(backupFolder, { recursive: true });

    let totalDeleted = 0;
    const summary = {};

    // ==========================================
    // 1. USERS BACKUP & DELETE
    // ==========================================
    const keepRoles = ['SUPER_ADMIN', 'BPM', 'CLF'];
    const usersToDelete = await db.collection('users').find({ 
      role: { $nin: keepRoles } 
    }).toArray();

    if (usersToDelete.length > 0) {
      fs.writeFileSync(
        path.join(backupFolder, 'users_deleted.json'), 
        JSON.stringify(usersToDelete, null, 2)
      );
      
      const delUsers = await db.collection('users').deleteMany({ 
        role: { $nin: keepRoles } 
      });
      
      summary['Users (Employees)'] = delUsers.deletedCount;
      totalDeleted += delUsers.deletedCount;
      console.log(`🗑️ Deleted ${delUsers.deletedCount} Users (JSON Backup Saved)`);
    } else {
      console.log(`ℹ️ No Employee users to delete.`);
    }

    // ==========================================
    // 2. OTHER COLLECTIONS BACKUP & DELETE
    // ==========================================
    const collectionsToClear = [
      'employees', 'advices', 'leaves', 'attendances',
      'actionplans', 'workdones', 'messages', 'messagerecipients',
      'auditlogs', 'clfs'
    ];

    for (const collName of collectionsToClear) {
      try {
        const docs = await db.collection(collName).find({}).toArray();
        
        if (docs.length > 0) {
          fs.writeFileSync(
            path.join(backupFolder, `${collName}_deleted.json`),
            JSON.stringify(docs, null, 2)
          );

          const result = await db.collection(collName).deleteMany({});
          summary[collName] = result.deletedCount;
          totalDeleted += result.deletedCount;
          console.log(`🗑️ Cleared ${collName}: ${result.deletedCount} rows (JSON Backup Saved)`);
        } else {
          console.log(`ℹ️ ${collName} is already empty.`);
        }
      } catch (err) {
        console.log(`⚠️ Collection ${collName} error:`, err.message);
      }
    }

    // ==========================================
    // 3. GENERATE SUMMARY JSON REPORT
    // ==========================================
    console.log('📄 Generating Summary Report...');
    
    const reportData = {
      cleanupDate: new Date().toLocaleString(),
      totalRecordsDeleted: totalDeleted,
      deletedCollections: summary
    };

    fs.writeFileSync(
      path.join(backupFolder, 'cleanup_summary.json'),
      JSON.stringify(reportData, null, 2)
    );

    console.log(`\n✅ All Backups saved in: ${backupFolder}`);
    console.log(`🚀 DATABASE CLEANUP SUCCESSFUL! Total ${totalDeleted} records deleted.`);

  } catch (error) {
    console.error('❌ Error during cleanup:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

runCleanup();




// // data ko phir se wahi par bhejne ke liye ye hai code 

// import mongoose from 'mongoose';
// import fs from 'fs';
// import path from 'path';
// import dotenv from 'dotenv';

// dotenv.config();

// const runRestore = async () => {
//   try {
//     const mongoURI = process.env.MONGODB_URI;
//     if (!mongoURI) {
//       console.error('❌ MONGODB_URI nahi mila. .env check karo.');
//       process.exit(1);
//     }

//     await mongoose.connect(mongoURI);
//     console.log('✅ Connected to Database...');
//     const db = mongoose.connection.db;

//     // ✅ Backup folder ka path (yahan apna folder name daalna jo tumne banaya tha)
//     const backupDir = path.join(process.cwd(), 'database_backup');
    
//     // Check karo ki folder exist karta hai ya nahi
//     if (!fs.existsSync(backupDir)) {
//       console.error('❌ database_backup folder nahi mila!');
//       process.exit(1);
//     }

//     // Sabse latest backup folder uthao
//     const folders = fs.readdirSync(backupDir).filter(f => f.startsWith('backup_'));
//     if (folders.length === 0) {
//       console.error('❌ Koi backup folder nahi mila database_backup ke andar!');
//       process.exit(1);
//     }
    
//     // Latest folder select karo
//     folders.sort().reverse();
//     const latestBackupFolder = path.join(backupDir, folders[0]);
//     console.log(`📂 Restoring from: ${latestBackupFolder}`);

//     const files = fs.readdirSync(latestBackupFolder);
//     let totalRestored = 0;

//     for (const file of files) {
//       // Sirf _deleted.json files uthao
//       if (file.endsWith('_deleted.json')) {
//         // File name se collection ka naam nikaalo (e.g. "users_deleted.json" -> "users")
//         const collName = file.replace('_deleted.json', '');
        
//         try {
//           const filePath = path.join(latestBackupFolder, file);
//           const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

//           if (data.length > 0) {
//             // Data insert karo
//             await db.collection(collName).insertMany(data);
//             totalRestored += data.length;
//             console.log(`✅ Restored ${data.length} records into '${collName}'`);
//           } else {
//             console.log(`ℹ️ ${file} is empty, skipping.`);
//           }
//         } catch (err) {
//           console.log(`⚠️ Error restoring ${collName}:`, err.message);
//         }
//       }
//     }

//     console.log(`\n🚀 DATA RESTORE SUCCESSFUL! Total ${totalRestored} records restored.`);

//   } catch (error) {
//     console.error('❌ Error during restore:', error);
//   } finally {
//     await mongoose.disconnect();
//     process.exit(0);
//   }
// };

// runRestore();