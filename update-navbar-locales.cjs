const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/locales/zh.json', 'utf8'));

en.navbar = {
  britain: 'Britain',
  chapter: 'Chapter',
  dark_theme: 'Dark Theme',
  light_theme: 'Light Theme',
  switch_dark: 'Switch to Dark Mode',
  switch_light: 'Switch to Light Mode',
  mute_ambience: 'Mute Ambience',
  play_ambience: 'Play Ambience',
  disable_sound: 'Disable Ambient Sound',
  enable_sound: 'Enable Ambient Sound',
  chapters: [
    { num: '01', name: 'Prologue' },
    { num: '02', name: 'The Awakening' },
    { num: '03', name: 'Victorian London' },
    { num: '04', name: 'Monoliths & Icons' },
    { num: '05', name: 'The Countryside' },
    { num: '06', name: 'Scotland Heights' },
    { num: '07', name: 'Nightfall' }
  ]
};

zh.navbar = {
  britain: '不列颠',
  chapter: '章节',
  dark_theme: '暗色主题',
  light_theme: '亮色主题',
  switch_dark: '切换至暗色模式',
  switch_light: '切换至亮色模式',
  mute_ambience: '静音环境音',
  play_ambience: '播放环境音',
  disable_sound: '禁用环境音效',
  enable_sound: '启用环境音效',
  chapters: [
    { num: '01', name: '序章' },
    { num: '02', name: '苏醒之城' },
    { num: '03', name: '维多利亚时代' },
    { num: '04', name: '地标与标志' },
    { num: '05', name: '英格兰乡村' },
    { num: '06', name: '苏格兰高地' },
    { num: '07', name: '夜幕降临' }
  ]
};

fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/zh.json', JSON.stringify(zh, null, 2));
