#!/bin/bash
cd /www/wwwroot/theveloura.ir
pm2 stop veloura
npm run build
pm2 restart veloura
rm -rf /www/server/nginx/proxy_cache_dir/*
nginx -s reload
echo "✅ Deploy کامل شد"
