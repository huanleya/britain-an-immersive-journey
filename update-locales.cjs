const fs = require('fs');

const en = JSON.parse(fs.readFileSync('src/locales/en.json', 'utf8'));
const zh = JSON.parse(fs.readFileSync('src/locales/zh.json', 'utf8'));

en.chapterEnding = {
  epilogue: 'Epilogue',
  quote1: '"Britain is not simply seen.',
  quote2: 'It is experienced."',
  completed: 'A DOCUMENTARY STORY COMPLETED',
  explore_again: 'Explore Again',
  contact: 'Contact',
  credits: 'Credits',
  get_in_touch: 'Get in Touch',
  contact_desc: 'This cinematic immersive documentary was created to push the boundaries of digital narrative experiences. For inquiries regarding licensing, curation, or web consulting, reach out through our digital desk:',
  production_credits: 'Production Credits',
  author: 'Author',
  creative_direction: 'Creative Direction',
  cinematography: 'Cinematography (RAW)',
  interactive_engineering: 'Interactive Engineering',
  symphonic_ambience: 'Symphonic Ambience',
  designed_in: '"Designed in the spirit of British luxury and documentary realism."',
  close_window: 'Close Window'
};

zh.chapterEnding = {
  epilogue: '终章',
  quote1: '"不列颠，不止于眼见。',
  quote2: '而在于体验。"',
  completed: '纪录片式故事已完成',
  explore_again: '再次探索',
  contact: '联系方式',
  credits: '制作人员',
  get_in_touch: '取得联系',
  contact_desc: '这部电影级沉浸式纪录片旨在突破数字叙事体验的边界。如有关于授权、策展或网络咨询的问题，请通过我们的数字前台联系：',
  production_credits: '制作人员名单',
  author: '作者',
  creative_direction: '创意指导',
  cinematography: '摄影 (RAW)',
  interactive_engineering: '交互工程',
  symphonic_ambience: '交响氛围',
  designed_in: '"以英式奢华与写实纪录精神设计"',
  close_window: '关闭窗口'
};

fs.writeFileSync('src/locales/en.json', JSON.stringify(en, null, 2));
fs.writeFileSync('src/locales/zh.json', JSON.stringify(zh, null, 2));
