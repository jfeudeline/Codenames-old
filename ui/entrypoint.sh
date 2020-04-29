#!/bin/sh
echo "window._env_['BASE_API_URL'] = '$REACT_APP_BASE_API_URL';" >> /usr/share/nginx/html/env-config.js


exec "$@"