export const SOCIALS = [
  { id:"s1",  name:"Instagram",  url:"https://instagram.com",       domain:"instagram.com",    color:"#E1306C" },
  { id:"s2",  name:"X / Twitter",url:"https://x.com",               domain:"x.com",            color:"#ffffff" },
  { id:"s3",  name:"TikTok",     url:"https://tiktok.com",          domain:"tiktok.com",       color:"#00F2EA" },
  { id:"s4",  name:"Snapchat",   url:"https://snapchat.com",        domain:"snapchat.com",     color:"#FFFC00" },
  { id:"s5",  name:"YouTube",    url:"https://youtube.com",         domain:"youtube.com",      color:"#FF0000" },
  { id:"s6",  name:"Facebook",   url:"https://facebook.com",        domain:"facebook.com",     color:"#1877F2" },
  { id:"s7",  name:"Reddit",     url:"https://reddit.com",          domain:"reddit.com",       color:"#FF4500" },
  { id:"s8",  name:"Twitch",     url:"https://twitch.tv",           domain:"twitch.tv",        color:"#9146FF" },
  { id:"s9",  name:"WhatsApp",   url:"https://web.whatsapp.com",    domain:"whatsapp.com",     color:"#25D366" },
  { id:"s10", name:"Telegram",   url:"https://web.telegram.org",    domain:"telegram.org",     color:"#26A5E4" },
  { id:"s11", name:"Threads",    url:"https://threads.net",         domain:"threads.net",      color:"#aaaaaa" },
  { id:"s12", name:"Pinterest",  url:"https://pinterest.com",       domain:"pinterest.com",    color:"#E60023" },
];

export const WORK = [
  { id:"w1",  name:"GitHub",     url:"https://github.com",          domain:"github.com",       color:"#ffffff" },
  { id:"w2",  name:"LinkedIn",   url:"https://linkedin.com",        domain:"linkedin.com",     color:"#0A66C2" },
  { id:"w3",  name:"Gmail",      url:"https://mail.google.com",     domain:"mail.google.com",  color:"#EA4335" },
  { id:"w4",  name:"Drive",      url:"https://drive.google.com",    domain:"drive.google.com", color:"#4285F4" },
  { id:"w5",  name:"Notion",     url:"https://notion.so",           domain:"notion.so",        color:"#ffffff" },
  { id:"w6",  name:"Figma",      url:"https://figma.com",           domain:"figma.com",        color:"#F24E1E" },
  { id:"w7",  name:"Discord",    url:"https://discord.com/app",     domain:"discord.com",      color:"#5865F2" },
  { id:"w8",  name:"Slack",      url:"https://slack.com",           domain:"slack.com",        color:"#ECB22E" },
  { id:"w9",  name:"VS Code",    url:"https://vscode.dev",          domain:"vscode.dev",       color:"#007ACC" },
  { id:"w10", name:"Vercel",     url:"https://vercel.com",          domain:"vercel.com",       color:"#ffffff" },
  { id:"w11", name:"Trello",     url:"https://trello.com",          domain:"trello.com",       color:"#0052CC" },
  { id:"w12", name:"Zoom",       url:"https://zoom.us",             domain:"zoom.us",          color:"#2D8CFF" },
];

export const GAMES = [
  { id:"g1",  name:"Valorant",   url:"https://playvalorant.com",                      domain:"playvalorant.com",   color:"#FF4655" },
  { id:"g2",  name:"CS2",        url:"https://store.steampowered.com/app/730",        domain:"steampowered.com",   color:"#F0A818" },
  { id:"g3",  name:"Fortnite",   url:"https://fortnite.com",                          domain:"fortnite.com",       color:"#00D4F5" },
  { id:"g4",  name:"Warzone",    url:"https://www.callofduty.com/warzone",            domain:"callofduty.com",     color:"#F5C518" },
  { id:"g5",  name:"GTA V",      url:"https://rockstargames.com/gta-v",              domain:"rockstargames.com",  color:"#FF6B35" },
  { id:"g6",  name:"Apex",       url:"https://ea.com/games/apex-legends",            domain:"ea.com",             color:"#CD4D27" },
  { id:"g7",  name:"League",     url:"https://leagueoflegends.com",                  domain:"leagueoflegends.com",color:"#C8A84B" },
  { id:"g8",  name:"Minecraft",  url:"https://minecraft.net",                        domain:"minecraft.net",      color:"#5B8C2A" },
  { id:"g9",  name:"Roblox",     url:"https://roblox.com",                           domain:"roblox.com",         color:"#FF0000" },
  { id:"g10", name:"Steam",      url:"https://store.steampowered.com",               domain:"steampowered.com",   color:"#00ADEE" },
  { id:"g11", name:"Epic Games", url:"https://epicgames.com",                        domain:"epicgames.com",      color:"#aaaaaa" },
  { id:"g12", name:"EA FC 25",   url:"https://www.ea.com/games/ea-sports-fc",        domain:"ea.com",             color:"#00D4AA" },
];

export const ENTERTAINMENT = [
  { id:"e1", name:"Netflix",     url:"https://netflix.com",          domain:"netflix.com",         color:"#E50914" },
  { id:"e2", name:"Spotify",     url:"https://open.spotify.com",     domain:"spotify.com",         color:"#1DB954" },
  { id:"e3", name:"Prime",       url:"https://primevideo.com",       domain:"primevideo.com",      color:"#00A8E1" },
  { id:"e4", name:"YT Music",    url:"https://music.youtube.com",    domain:"music.youtube.com",   color:"#FF0000" },
  { id:"e5", name:"Disney+",     url:"https://disneyplus.com",       domain:"disneyplus.com",      color:"#113CCF" },
  { id:"e6", name:"SoundCloud",  url:"https://soundcloud.com",       domain:"soundcloud.com",      color:"#FF5500" },
  { id:"e7", name:"Apple Music", url:"https://music.apple.com",      domain:"music.apple.com",     color:"#FC3C44" },
  { id:"e8", name:"Hulu",        url:"https://hulu.com",             domain:"hulu.com",            color:"#1CE783" },
];

export const ALL_APPS = {
  socials: SOCIALS,
  work: WORK,
  games: GAMES,
  entertainment: ENTERTAINMENT,
};

export const CATS = [
  { key:"socials",       label:"Social Media",   accent:"#FF6B9D", desc:"Stay connected everywhere"  },
  { key:"work",          label:"Work & Dev",      accent:"#00E5FF", desc:"Your productivity stack"    },
  { key:"games",         label:"Games",           accent:"#9D4EDD", desc:"Your gaming universe"       },
  { key:"entertainment", label:"Entertainment",   accent:"#FF9F1C", desc:"Media & music"              },
];

export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
