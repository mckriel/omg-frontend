#!/usr/bin/env node

/**
 * Guild Tabard Generator
 * Downloads and composites the guild tabard from Battle.net API data
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load guild tabard info
const tabard_info_path = path.join(__dirname, '../public/guild-tabard/guild-tabard-info.json');
const tabard_data = JSON.parse(fs.readFileSync(tabard_info_path, 'utf8'));

console.log('Guild Tabard Information:');
console.log('========================');
console.log(`Guild: ${tabard_data.guildName}`);
console.log(`Realm: ${tabard_data.realm}`);
console.log(`Faction: ${tabard_data.faction}`);
console.log('');

console.log('Emblem Information:');
console.log(`- ID: ${tabard_data.crest.emblem.id}`);
console.log(`- Color: rgba(${tabard_data.crest.emblem.color.rgba.r}, ${tabard_data.crest.emblem.color.rgba.g}, ${tabard_data.crest.emblem.color.rgba.b}, ${tabard_data.crest.emblem.color.rgba.a})`);
console.log(`- URL: ${tabard_data.crest.emblem.imageUrl}`);
console.log(`- Local Path: ${tabard_data.crest.emblem.localPath}`);
console.log('');

console.log('Border Information:');
console.log(`- ID: ${tabard_data.crest.border.id}`);
console.log(`- Color: rgba(${tabard_data.crest.border.color.rgba.r}, ${tabard_data.crest.border.color.rgba.g}, ${tabard_data.crest.border.color.rgba.b}, ${tabard_data.crest.border.color.rgba.a})`);
console.log(`- URL: ${tabard_data.crest.border.imageUrl}`);
console.log(`- Local Path: ${tabard_data.crest.border.localPath}`);
console.log('');

console.log('Background Color:');
console.log(`- rgba(${tabard_data.crest.background.color.rgba.r}, ${tabard_data.crest.background.color.rgba.g}, ${tabard_data.crest.background.color.rgba.b}, ${tabard_data.crest.background.color.rgba.a})`);
console.log('');

console.log('Downloaded Images:');
const emblem_path = path.join(__dirname, '../public', tabard_data.crest.emblem.localPath);
const border_path = path.join(__dirname, '../public', tabard_data.crest.border.localPath);

if (fs.existsSync(emblem_path)) {
  const emblem_stats = fs.statSync(emblem_path);
  console.log(`✅ Emblem: ${emblem_path} (${emblem_stats.size} bytes)`);
} else {
  console.log(`❌ Emblem: ${emblem_path} (not found)`);
}

if (fs.existsSync(border_path)) {
  const border_stats = fs.statSync(border_path);
  console.log(`✅ Border: ${border_path} (${border_stats.size} bytes)`);
} else {
  console.log(`❌ Border: ${border_path} (not found)`);
}

console.log('');
console.log('To use the guild tabard in your React components:');
console.log('```jsx');
console.log('import GuildTabard from "@/core/components/GuildTabard";');
console.log('');
console.log('// Basic usage');
console.log('<GuildTabard size={64} />');
console.log('');
console.log('// Without guild name');
console.log('<GuildTabard size={128} showGuildName={false} />');
console.log('```');
console.log('');

console.log('Direct image URLs:');
console.log(`- Emblem: ${tabard_data.crest.emblem.imageUrl}`);
console.log(`- Border: ${tabard_data.crest.border.imageUrl}`);