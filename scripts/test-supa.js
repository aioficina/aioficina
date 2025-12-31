
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

async function testConnection() {
    try {
        const envPath = path.resolve(__dirname, '../.env.local');
        if (!fs.existsSync(envPath)) {
            console.error('Error: .env.local file not found');
            return;
        }

        const envContent = fs.readFileSync(envPath, 'utf8');
        const envVars = {};
        envContent.split('\n').forEach(line => {
            const parts = line.split('=');
            if (parts.length >= 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join('=').trim().replace(/(^"|"$)/g, '');
                envVars[key] = value;
            }
        });

        const url = envVars['NEXT_PUBLIC_SUPABASE_URL'];
        const key = envVars['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

        if (!url || !key) {
            console.error('Error: Missing Supabase credentials in .env.local');
            console.log('Found keys:', Object.keys(envVars));
            return;
        }

        console.log('Attempting to connect to Supabase at:', url);
        const supabase = createClient(url, key);

        // Try a simple query without auth first, often public tables are not readable, 
        // but the connection itself can be verified if we get a specific error (like 401) vs a network error.
        // Or we can try to get the auth settings or just ping.
        // Listing buckets is often a good public check if storage is enabled, or just checking if we can init.

        // A query that requires no specific table:
        const { data, error } = await supabase.from('modules').select('count', { count: 'exact', head: true });

        if (error) {
            // If the error is regarding permissions, it means we CONNECTED but were denied.
            // If the error is network related, we failed to connect.
            console.log('Connection test result:');
            if (error.code === 'PGRST301' || error.message.includes('fetch') || error.message.includes('network')) {
                console.error('FAILED: Network or Configuration Error:', error.message);
            } else {
                console.log('SUCCESS: Connected to Supabase (Database responded, even if with error):', error.message);
            }
        } else {
            console.log('SUCCESS: Connected to Supabase and query successful.');
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

testConnection();
