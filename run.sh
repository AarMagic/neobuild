#! /bin/bash

echo "Running Project"
sudo systemctl start mongod
echo "Running MongoDB..."
cd ./backend
gnome-terminal --tab -- bash -c "cd /var/www/html/master-react/neobuild/backend && npm start; exec bash"
echo "Loaded Backend "
gnome-terminal --tab -- bash -c "cd /var/www/html/master-react/neobuild/frontend/neobuild/ && npm run dev; exec bash"

echo "Loaded FrontEnd "
