sudo echo 'deb https://deb.volian.org/volian/ scar main' | sudo tee /etc/apt/sources.list.d/volian-archive-scar-unstable.list 
sudo wget -qO - https://deb.volian.org/volian/scar.key | sudo tee /etc/apt/trusted.gpg.d/volian-archive-scar-unstable.gpg
sudo apt update
sudo apt install nala neofetch cmatrix htop -yf
sudo chmod +x ./"speedtest"
curl https://raw.githubusercontent.com/oh-my-fish/oh-my-fish/master/bin/install | fish
fish -c "omf install bobthefish" 
cp -r /workspaces/OSZIMT-repo-ITA12_aps/.config/  /home/vscode/
fish
bash /workspaces/OSZIMT-repo-ITA12_aps/.config/font.sh